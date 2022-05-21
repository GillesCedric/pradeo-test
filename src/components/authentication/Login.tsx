import React from 'react'
import loginImg from "../../assets/login.svg"
import { AuthenticationProps } from '../../pages/Authentication'

interface LoginProps extends AuthenticationProps {

}

export default class Login extends React.Component<LoginProps, {}> {
	constructor(props: LoginProps) {
		super(props)
	}


	render() {
		return <div className="base-container" >
			<div className="header">
				{this.props.vocabulary.sign_in}
			</div>
			<div className="content">
				<div className="image">
					<img src={loginImg} alt="login-img" />
				</div>
				<div className="form">
					<div className="form-group">
						<label htmlFor="username">{this.props.vocabulary.username}</label>
						<input type="text" name="username" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.username}`} />
					</div>
					<div className="form-group">
						<label htmlFor="password">{this.props.vocabulary.password}</label>
						<input type="password" name="password" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.password}`} />
					</div>
					<div className="footer">
						<button className="btn" type="button">
							{this.props.vocabulary.sign_in}
						</button>
					</div>
				</div>
			</div>
		</div>
	}
}