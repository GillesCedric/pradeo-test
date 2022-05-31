import React from 'react'
import '../styles/authentication.scss'
import '../styles/style.scss'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import Side from '../components/authentication/Side'
import { PageProps } from './Page'

/**
 * @class Authentication
 * @author Gilles Cédric
 * @description this class is used to represent the Authentication page
 * @extends React.Component
 * @exports
 * @default
 * @since 30/05/2022
 */
export default class Authentication extends React.Component<PageProps, { isLogin: boolean }> {

	/**
	 * @constructor
	 * @param {PageProps} props the props for the component
	 */
	constructor(props: PageProps) {
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
		return <div className='authentication'>
			<div className="login">
				<div className="container">
					{this.state.isLogin && <Login vocabulary={this.props.vocabulary} />}
					{!this.state.isLogin && <Register vocabulary={this.props.vocabulary} />}
				</div>
				<Side vocabulary={this.props.vocabulary} containerRef={ref => this.side = ref} updater={this.updateComponent} isLogin={this.state.isLogin} />
			</div>
		</div>
	}
}