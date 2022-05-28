import React from "react"
import Main, { Application } from "../components/home/Main"
import Sidebar, { User } from "../components/home/Sidebar"
import { PageProps } from "./Page"
import '../styles/home.scss'
import { RingLoader } from "react-spinners"
import API from "../modules/api/API"

interface HomeProps extends PageProps {
	updater: (index: number) => void
}

interface HomeState {
	isLoading: boolean
	user?: User
	applications: Application[]
}
export default class Home extends React.Component<HomeProps, HomeState> {

	constructor(props: HomeProps) {
		super(props)
		this.state = {
			isLoading: true,
			applications: []
		}
	}

	readonly componentDidMount = () => {

		//FIXME componentDidMount rendered twice
		this.getUserData()
	}

	private readonly getUserData = () => {

		//re-initialization of the state
		this.setState({ isLoading: true })

		API.getAllForUser()
			.then(value => {

				this.setState({
					isLoading: false,
					applications: value.data.user.Applications,
					user: {
						id: value.data.user.id,
						username: value.data.user.username,
						avatar: value.data.user.avatar,
						email: value.data.user.email
					}
				})
			})
			.catch(error => {
				console.log(error)
			})

	}

	render = () => {
		if (this.state.isLoading) return <div className="loader"><RingLoader /></div>
		return <div className="home">
			<Sidebar
				vocabulary={this.props.vocabulary}
				user={this.state.user}
				updater={this.props.updater}
			/>
			<Main
				vocabulary={this.props.vocabulary}
				applications={this.state.applications}
				onUpdate={this.getUserData}
			/>
		</div>
	}
}