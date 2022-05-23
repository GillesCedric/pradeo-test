import React from 'react'
import loginImg from "../../assets/login.svg"
import Authentication from './Authentication'
import Toast from '../Toats'
import API from '../../modules/api/API'
import { Navigate } from 'react-router-dom'

export default class Register extends Authentication {

	protected handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (event: React.MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()

		const data = new FormData(this.form)

		const username = data.get('username') as string
		const password = data.get('password') as string
		const email = data.get('email') as string

		if (username.toString().length > 0 && password.toString().length > 0 && email.toString().length > 0) {
			this.setState({isLoading: true})
			API.login({
				username,
				password,
				email
			}).then(value => {
				this.setState({redirect: true})
			})
			.catch(error => {
				console.log(error)
				this.setState({error: error.response.data.error})
			})
			.finally(() => {
				this.setState({isLoading: false})
			})
		}else{
			this.setState({error: this.props.vocabulary.errors.empty})
		}
	}

	render() {
		if(this.state.redirect) return <Navigate to={'/authenticate'} />
		
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
						<input type="text" name="username" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.username}`} required />
					</div>
					<div className="form-group">
						<label htmlFor="password">{this.props.vocabulary.password}</label>
						<input type="password" name="password" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.password}`} required />
					</div>
					<div className="form-group">
						<label htmlFor="email">{this.props.vocabulary.mail}</label>
						<input type="email" name="email" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.mail}`} required />
					</div>
					<div className="footer">
						<button disabled={this.state.isLoading} className="btn" type="submit" onClick={(event) => this.handleSubmit(event)}>
							{this.state.isLoading ? this.props.vocabulary.loading : this.props.vocabulary.sign_up}
						</button>
					</div>
				</div>
			</div>
		</div>
	}
}