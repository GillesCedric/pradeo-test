import React from "react"
import { Button, Table } from "react-bootstrap"
import { FaHeart, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa'
import Crypto from "../../modules/crypto/Crypto"
import { PageProps, PageState } from "../../pages/Page"
import Toast from "../Toats"
import AddApplication from "./AddApplication"

export type Application = {
	id: string
	name?: string
	comment?: string
	status: string
}

export interface MainProps extends PageProps {
	applications: Application[]
}

export interface MainState extends PageState {
	isModalShowed: boolean
}

export default class Main extends React.Component<MainProps, MainState> {

	constructor(props: MainProps){
		super(props)
		this.state = {
			isModalShowed: false,
			notification: {
				status: 'danger',
				isActive: false,
				text: ''
			}
		}
		
	}

	render = () => {
		return <main>
			<header>
				<div className="float-end mt-4">
					<Button onClick={() => this.setState({isModalShowed: true})}><span className="p-2">{this.props.vocabulary.add.application}</span><FaPlus /></Button>
				</div>
			</header>

			<div className="block text-center">
				<Table striped bordered hover >
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>COMMENTS</th>
							<th>STATUS</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.applications.length > 0 ?
								this.props.applications.map((application: Application) => {
									return <tr key={Crypto.identifier()}>
										<td>{application.id}</td>
										<td>{application.name}</td>
										<td>{application.comment}</td>
										<td>{application.status}</td>
										<td>
											<span>
												<Button title={this.props.vocabulary.update}><FaPencilAlt /></Button>
											</span>
											<span>
												<Button title={this.props.vocabulary.delete}><FaTrash /></Button>
											</span>
										</td>
									</tr>
								})
								: <tr>
									<td colSpan={5} className="fs-2 p-5">Vous n'avez aucune application</td>
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
			show={this.state.isModalShowed} 
			vocabulary={this.props.vocabulary}
			onClose={() => this.setState({isModalShowed: false})} 
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