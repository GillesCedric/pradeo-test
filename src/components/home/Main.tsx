import React from "react"
import { Button, Table } from "react-bootstrap"
import { FaDownload, FaHeart, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa'
import API from "../../modules/api/API"
import Crypto from "../../modules/crypto/Crypto"
import { PageProps, PageState } from "../../pages/Page"
import Toast from "../Toats"
import AddApplication from "./AddApplication"
import DeleteApplication from "./DeleteApplication"
import EditApplication from "./EditApplication"
import socketIOClient from "socket.io-client"

export type Application = {
	id: string | number
	hash: string
	name?: string
	comment?: string
	status: string
}

export interface MainProps extends PageProps {
	applications: Application[]
	onUpdate: () => void
}

export interface MainState extends PageState {
	applications: Application[]
	addApplicationModalShowed: boolean
	deleteApplicationModal: {
		isShowed: boolean
		id: string | number
	}
	editApplicationModal: {
		isShowed: boolean
		application: Application
	}
}

export default class Main extends React.Component<MainProps, MainState> {

	constructor(props: MainProps) {
		super(props)
		this.state = {
			applications: this.props.applications,
			addApplicationModalShowed: false,
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
			},
			notification: {
				status: 'danger',
				isActive: false,
				text: ''
			}
		}

	}

	componentDidMount = () => {
		// const socket = socketIOClient('http://localhost:8000')
		
		// socket.on('fromApi', (data) => {
		// 	console.log(data)
		// })
		//socket.emit('fromClient', 'client message')
	}

	private readonly addApplication = (form: FormData) => {
		API.addApplication(form)
			.then(value => {
				this.setState({ notification: { isActive: true, text: value.data.message, status: 'success' }})
				this.props.onUpdate()
			})
			.catch(error => {
				console.log(error)
				this.setState({ notification: { isActive: true, text: error.error || error.response.data.message, status: 'danger' } })
			})
			.finally(() => this.setState({ addApplicationModalShowed: false }))
	}

	private readonly deleteApplication = () => {
		API.deleteApplication(this.state.deleteApplicationModal.id)
			.then(value => {
				this.setState({ notification: { isActive: true, text: value.data.message, status: 'success' } })
				this.props.onUpdate()
			})
			.catch(error => {
				console.log(error)
				this.setState({ notification: { isActive: true, text: error.error || error.response.data.message, status: 'danger' } })
			})
			.finally(() => this.setState({ deleteApplicationModal: { isShowed: false, id: '' } }))
	}

	private readonly editApplication = (form: FormData) => {
		API.updateApplication(this.state.deleteApplicationModal.id, form)
			.then(value => {
				this.setState({ notification: { isActive: true, text: value.data.message, status: 'success' } })
				this.props.onUpdate()
			})
			.catch(error => {
				console.log(error)
				this.setState({ notification: { isActive: true, text: error.error || error.response.data.message, status: 'danger' } })
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

	private readonly download = (applicationId: string | number) => {

	}

	render = () => {
		return <main>
			<header>
				<div className="float-end mt-4">
					<Button onClick={() => this.setState({ addApplicationModalShowed: true })}><span className="p-2">{this.props.vocabulary.add.application}</span><FaPlus /></Button>
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
												onClick={() => this.download(application.id)}
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
					© {new Date().getFullYear()} made with <FaHeart style={{ color: 'red' }} /> by -{' '}
					<a target="_blank" rel="noopener noreferrer" href="https://azouaoui.netlify.com">
						Mohamed Azouaoui
					</a>
				</small>
				<br />
				<div className="social-bagdes">
					<a href="https://github.com/azouaoui-med" target="_blank" rel="noopener noreferrer">
						<img
							alt="GitHub followers"
							src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social"
						/>
					</a>
					<a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">
						<img
							alt="Twitter Follow"
							src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social"
						/>
					</a>
				</div>
			</footer>
			<AddApplication
				show={this.state.addApplicationModalShowed}
				vocabulary={this.props.vocabulary}
				onSubmit={form => this.addApplication(form)}
				onClose={() => this.setState({ addApplicationModalShowed: false })}
				onError={error => this.setState({ notification: { isActive: true, status: 'danger', text: error } })}
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
				onSubmit={form => this.editApplication(form)}
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
			/>
			<Toast
				title={this.state.notification.status === "danger" ? this.props.vocabulary.error : this.props.vocabulary.notification}
				vocabulary={this.props.vocabulary}
				message={this.state.notification.text}
				variant={this.state.notification.status}
				show={this.state.notification.isActive}
				onClose={() => this.setState({ notification: { isActive: false, text: '', status: 'danger' } })}
			/>
		</main>
	}
}