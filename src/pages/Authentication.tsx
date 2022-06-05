import React from 'react'
import '../styles/authentication.scss'
import '../styles/style.scss'
import '../styles/hamburger.scss'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import Side from '../components/authentication/Side'
import { PageProps } from './Page'
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

/**
 * @interface AuthenticationProps
 * @author Gilles Cédric
 * @extends PageProps
 * @description this interface is the Props definition for the Authentication component
 * @since 05/06/2022
 */
interface AuthenticationProps extends PageProps {
	updater: (index: number) => void
}

/**
 * @class Authentication
 * @author Gilles Cédric
 * @description this class is used to represent the Authentication page
 * @extends React.Component
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class Authentication extends React.Component<AuthenticationProps, { isLogin: boolean }> {

	/**
	 * @constructor
	 * @param {AuthenticationProps} props the props for the component
	 */
	constructor(props: AuthenticationProps) {
		super(props)
		this.state = {
			isLogin: true,
		}
	}

	/**
	 * @property
	 * @private
	 * @description this object is a ref for the side component
	 */
	private side: HTMLDivElement | null = null

	/**
	 * @override
	 * @returns void
	 */
	componentDidMount = () => {
		this.side?.classList.add("right");
	}

	/**
	 * @property
	 * @private
	 * @readonly
	 * @description this method is used for updating the Side component
	 * @return void
	 */
	private readonly updateComponent = () => {
		if (this.state.isLogin) {
			this.side?.classList.remove("right");
			this.side?.classList.add("left");
		} else {
			this.side?.classList.remove("left");
			this.side?.classList.add("right");
		}

		this.setState({ isLogin: !this.state.isLogin })
	}

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
		return <>
			<Menu>
				<NavLink id="home" className="menu-item" to="/">Home</NavLink>
				<NavLink
					id="english"
					className="menu-item"
					to="#"
					onClick={() => this.props.updater(1)}
				>
					{this.props.vocabulary.english}
				</NavLink>
				<NavLink
					id="french"
					className="menu-item"
					to="#"
					onClick={() => this.props.updater(0)}
				>
					{this.props.vocabulary.french}
				</NavLink>
			</Menu>
			<div className='authentication'>
				<div className="login">
					<div className="container">
						{this.state.isLogin && <Login vocabulary={this.props.vocabulary} />}
						{!this.state.isLogin && <Register vocabulary={this.props.vocabulary} />}
					</div>
					<Side vocabulary={this.props.vocabulary} containerRef={ref => this.side = ref} updater={this.updateComponent} isLogin={this.state.isLogin} />
				</div>
			</div>
		</>
	}
}