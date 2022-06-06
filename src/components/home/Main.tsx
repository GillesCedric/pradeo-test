import React from "react"
import { Button, Table } from "react-bootstrap"
import { FaDownload, FaHeart, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa'
import API from "../../modules/api/API"
import Crypto from "../../modules/crypto/Crypto"
import { PageProps } from "../../pages/Page"
import AddApplication from "./AddApplication"
import DeleteApplication from "./DeleteApplication"
import EditApplication from "./EditApplication"
import fileDownload from 'js-file-download'
import { ToastContainer, toast } from 'react-toastify'

/**
 * @type Application
 * @author Gilles Cédric
 * @description this type is used to represent the Application model
 * @exports
 * @since 23/05/2022
 */
export type Application = {
	id: string | number
	hash: string
	name?: string
	comment?: string
	status: string
}

/**
 * @interface MainProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the Main component
 * @extends PageProps
 * @exports
 * @since 23/05/2022
 */
export interface MainProps extends PageProps {
	applications: Application[]
	onUpdate: (isNew?: boolean) => void
}

/**
 * @interface MainState
 * @author Gilles Cédric
 * @description this interface represent the state definition fot the Main component
 * @extends PageState
 * @exports
 * @since 23/05/2022
 */
export interface MainState {
	applications: Application[]
	addApplicationModal: {
		isShowed: boolean
		loaded: number
	}
	deleteApplicationModal: {
		isShowed: boolean
		id: string | number
	}
	editApplicationModal: {
		isShowed: boolean
		application: Application
	}
}

/**
 * @class Main
 * @author Gilles Cédric
 * @description this class is used to represent the Main component
 * @extends React.Component
 * @exports
 * @default
 * @since 23/05/2022
 */
export default class Main extends React.Component<MainProps, MainState> {

	/**
	 * @constructor
	 * @param {MainProps} props the props of the application
	 */
	constructor(props: MainProps) {
		super(props)
		this.state = {
			applications: this.props.applications,
			addApplicationModal: {
				isShowed: false,
				loaded: 0
			},
			deleteApplicationModal: {
				isShowed: false,
				id: '',
			},
			editApplicationModal: {
				isShowed: false,
				application: {
					id: '',
					hash: '',
					name: '',
					status: '',
					comment: ''
				}
			}
		}

	}

	/**
	 * @method addApplication
	 * @description the method is used to add an application to the API and handle the response
	 * @param {FormData} form the FormData instance which containing the application file
	 * @returns {void}
	 * @private
	 * @readonly
	 */
	private readonly addApplication = (form: FormData): void => {
		API.addApplication(form, loaded => this.setState({ addApplicationModal: { isShowed: true, loaded: loaded } }))
			.then(value => {
				this.props.onUpdate(true)
				toast.success(value.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.catch(error => {
				toast.error(error.error || error.response.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.finally(() => this.setState({ addApplicationModal: { isShowed: false, loaded: 0 } }))
	}

	/**
	 * @method deleteApplication
	 * @description the method is used to delete an application from the API and handle the response
	 * @returns {void}
	 * @private
	 * @readonly
	 */
	private readonly deleteApplication = (): void => {
		API.deleteApplication(this.state.deleteApplicationModal.id)
			.then(value => {
				this.props.onUpdate()
				toast.success(value.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.catch(error => {
				toast.error(error.error || error.response.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.finally(() => this.setState({ deleteApplicationModal: { isShowed: false, id: '' } }))
	}

	/**
	 * @method editApplication
	 * @description the method is used to add an application to the API and handle the response
	 * @param {string} name the name of the application
	 * @param {string | undefined} comment the comment of the application
		 * @returns {void}
	 * @private
	 * @readonly
	 */
	private readonly editApplication = (name?: string, comment?: string): void => {
		API.updateApplication(this.state.editApplicationModal.application.id, name, comment)
			.then(value => {
				this.props.onUpdate()
				toast.success(value.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.catch(error => {
				toast.error(error.error || error.response.data.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.finally(() => this.setState({
				editApplicationModal: {
					isShowed: false,
					application: {
						id: '',
						hash: '',
						name: '',
						status: '',
						comment: ''
					}
				}
			}))
	}

	/**
	 * @method download
	 * @description the method is used to add an application to the API and handle the response
	 * @param {string | number} applicationId the id of the application
	 * @param {string} fileName the name of the application
	 * @returns {void}
	 * @private
	 * @readonly
	 */
	private readonly download = (applicationId: string | number, fileName: string): void => {
		API.downloadApplication(applicationId)
			.then(value => {
				fileDownload(value.data, fileName + '.apk')
			})
			.catch(error => {
				console.log(error)
			})

	}

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = () => {
		return <main>
			<header>
				<div className="float-end mt-4">
					<Button onClick={() => this.setState({ addApplicationModal: { isShowed: true, loaded: 0 } })}><span className="p-2">{this.props.vocabulary.add.application}</span><FaPlus /></Button>
				</div>
			</header>

			<div className="block text-center">
				<Table striped bordered hover >
					<thead>
						<tr>
							<th>{this.props.vocabulary.id.toUpperCase()}</th>
							<th>{this.props.vocabulary.name.toUpperCase()}</th>
							<th>{this.props.vocabulary.hash.toUpperCase()}</th>
							<th>{this.props.vocabulary.comment.toUpperCase()}</th>
							<th>{this.props.vocabulary.status.toUpperCase()}</th>
							<th>{this.props.vocabulary.actions.toUpperCase()}</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.applications.length > 0 ?
								this.state.applications.map((application: Application, index: number) => {
									return <tr
										key={Crypto.identifier(index)}
									>
										<td>{application.id}</td>
										<td>{application.name}</td>
										<td className={'text-break w-25'}>{application.hash}</td>
										<td>{application.comment}</td>
										<td
											className={application.status === 'Sûre' ? 'text-success' : application.status === 'En cours de vérification' ? 'text-warning' : 'text-danger'}
										>
											{application.status}
										</td>
										<td style={{ width: '20%' }}>
											<Button
												variant="secondary"
												title={this.props.vocabulary.update}
												onClick={() => this.setState({
													editApplicationModal: {
														isShowed: true,
														application: {
															id: application.id,
															hash: application.hash,
															name: application.name,
															comment: application.comment,
															status: application.status
														}
													}
												})}
											>
												<FaPencilAlt />
											</Button>
											<Button
												variant="danger"
												title={this.props.vocabulary.delete._}
												onClick={() => this.setState({
													deleteApplicationModal: { isShowed: true, id: application.id }
												})}
												className='m-2'
											>
												<FaTrash />
											</Button>
											<Button
												variant="success"
												title={this.props.vocabulary.download_apk.split(' ')[0]}
												onClick={() => this.download(application.id, application.name || application.hash)}
											>
												<FaDownload />
											</Button>



										</td>
									</tr>
								})
								: <tr>
									<td colSpan={6} className="fs-2 p-5">{this.props.vocabulary.applications_empty}</td>
								</tr>
						}
					</tbody>
				</Table>
			</div>

			<footer>
				<small>
					© {new Date().getFullYear()} made by {' '}
					<a target="_blank" rel="noopener noreferrer" href="https://github.com/GillesCedric">
						Gilles Cédric
					</a>
				</small>
			</footer>
			<AddApplication
				show={this.state.addApplicationModal.isShowed}
				vocabulary={this.props.vocabulary}
				loaded={this.state.addApplicationModal.loaded}
				onSubmit={form => this.addApplication(form)}
				onClose={() => this.setState({ addApplicationModal: { isShowed: false, loaded: 0 } })}
				onError={error =>
					toast.error(error, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
				}
			/>
			<DeleteApplication
				show={this.state.deleteApplicationModal.isShowed}
				vocabulary={this.props.vocabulary}
				onSubmit={() => this.deleteApplication()}
				onClose={() => this.setState({ deleteApplicationModal: { isShowed: false, id: '' } })}
			/>
			<EditApplication
				show={this.state.editApplicationModal.isShowed}
				application={this.state.editApplicationModal.application}
				vocabulary={this.props.vocabulary}
				onSubmit={(name, comment) => this.editApplication(name, comment)}
				onClose={() => this.setState({
					editApplicationModal: {
						isShowed: false,
						application: {
							id: '',
							hash: '',
							name: '',
							status: '',
							comment: ''
						}
					}
				})}
				onError={error =>
					toast.error(error, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
				}
			/>
			<ToastContainer />
		</main>
	}
}