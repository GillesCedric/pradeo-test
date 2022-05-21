import React from 'react'
import loginImg from "../../assets/login.svg"
import { AuthenticationProps } from '../../pages/Authentication'

interface RegisterProps extends AuthenticationProps {
	
}

export default class Register extends React.Component<RegisterProps, {}> {
	constructor(props: RegisterProps) {
		super(props)
	}

	render() {
		return <div className="base-container" >
			<div className="header">
				{this.props.vocabulary.sign_up}
			</div>
			<div className="content">
				<div className="image">
					<img src={loginImg} alt="register-img" />
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
					<div className="form-group">
						<label htmlFor="email">{this.props.vocabulary.mail}</label>
						<input type="email" name="email" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.mail}`} />
					</div>
					<div className="footer">
						<button className="btn" type="button">
							{this.props.vocabulary.sign_up}
						</button>
					</div>
				</div>
			</div>
		</div>
	}
}