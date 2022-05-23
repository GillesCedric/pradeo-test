import React from 'react';
import '../styles/authentication.scss';
import '../styles/style.scss';
import 'react-pro-sidebar/dist/css/styles.css';
import Register from '../components/authentication/Register';
import Login from '../components/authentication/Login';
import Side from '../components/authentication/Side';
import { PageProps } from './PageProps';

export default class Authentication extends React.Component<PageProps, { isLogin: boolean }> {

	constructor(props: PageProps) {
		super(props)
		this.state = {
			isLogin: true,
		}
	}

	private side: HTMLDivElement | null = null

	componentDidMount = () => {
		this.side?.classList.add("right");
	}

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

	render = () => {
		return <>
			<div className="login">
				<div className="container">
					{this.state.isLogin && <Login vocabulary={this.props.vocabulary} />}
					{!this.state.isLogin && <Register vocabulary={this.props.vocabulary} />}
				</div>
				<Side vocabulary={this.props.vocabulary} containerRef={ref => this.side = ref} updater={this.updateComponent} isLogin={this.state.isLogin} />
			</div>
		</>
	}
}