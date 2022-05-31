import React from "react"
import Main, { Application } from "../components/home/Main"
import Sidebar, { User } from "../components/home/Sidebar"
import { PageProps } from "./Page"
import '../styles/home.scss'
import { RingLoader } from "react-spinners"
import API from "../modules/api/API"

/**
 * @interface HomeProps
 * @author Gilles Cédric
 * @extends PageProps
 * @description this interface is the Props definition for the Home component
 * @since 30/05/2022
 */
interface HomeProps extends PageProps {
	updater: (index: number) => void
}

/**
 * @interface HomeState
 * @author Gilles Cédric
 * @description this interface is the State definition for the page component
 * @since 30/05/2022
 */
interface HomeState {
	isLoading: boolean
	user?: User
	applications: Application[]
}

/**
 * @class Home
 * @author Gilles Cédric
 * @description this class is used to represent the Home page (Dashboard)
 * @extends React.Component
 * @exports
 * @default
 * @since 30/05/2022
 */
export default class Home extends React.Component<HomeProps, HomeState> {

	constructor(props: HomeProps) {
		super(props)
		this.state = {
			isLoading: true,
			applications: []
		}
	}

	/**
	 * @override
	 * @returns void
	 */
	readonly componentDidMount = () => {

		//FIXME componentDidMount rendered twice
		this.getUserData()
	}

	/**
	 * @property
	 * @description this method is used to get the user data form the server
	 * @private
	 * @readonly
	 * @param {boolean} isNew boolean parameter that used to determine if new application has been added
	 */
	private readonly getUserData = (isNew?: boolean) => {

		//re-initialization of the state
		this.setState({ isLoading: true })

		//getting all the information's from the API
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
				}, () => {
					//if is a new application, we have to verify it
					if (isNew) {
						//we getting the max application id in the state to get the new application
						let newApplication = this.state.applications[0]
						this.state.applications.forEach(application => {
							if (application.id > newApplication.id) newApplication = application
						})
						//we verify the application in a setInterval for assuring that we'll finally have a response from the VirusToptal API
						let intervalId = setInterval(() => {
							API.verifyApplication(newApplication.id, newApplication.hash)
								.then(value => {
									if (value.data.isVerified) {
										clearInterval(intervalId)
										this.getUserData()
									}
								})
								.catch(error => {
									console.log(error)
								})
						}, 60000)

					}
				})
			})
			.catch(error => {
				console.log(error)
			})

	}

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
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
				onUpdate={(isNew) => this.getUserData(isNew)}
			/>
		</div>
	}
}