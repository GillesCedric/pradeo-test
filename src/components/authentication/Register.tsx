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
			this.setState({ isLoading: true })
			API.register({
				username,
				password,
				email
			}).then(value => {
				this.setState({ notification: {isActive: true, status: 'success', text: this.props.vocabulary.register_success} })
			})
				.catch(error => {
					console.log(error)
					this.setState({ notification: {isActive: true, status: 'danger', text: error.response.data.error} })
				})
				.finally(() => {
					this.setState({ isLoading: false })
				})
		} else {
			this.setState({ notification: { isActive: true, text: this.props.vocabulary.errors.empty, status: 'danger' } })
		}
	}

	render() {
		if (this.state.redirect) return <Navigate to={'/authenticate'} />

		return <>
			<div className="base-container" >
				<div className="header">
					{this.props.vocabulary.sign_up}
				</div>
				<div className="content">
					<div className="image">
						<img src={loginImg} alt="register-img" />
					</div>
					<form className="form" ref={ref => this.form = ref as HTMLFormElement} >
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
							<button disabled={this.state.isLoading} className="btn-a" type="submit" onClick={(event) => this.handleSubmit(event)}>
								{this.state.isLoading ? this.props.vocabulary.loading : this.props.vocabulary.sign_up}
							</button>
						</div>
					</form>
				</div>
			</div>
			<Toast
				title={this.state.notification.status === "danger" ? this.props.vocabulary.error : this.props.vocabulary.notification}
				vocabulary={this.props.vocabulary}
				message={this.state.notification.text}
				variant={this.state.notification.status}
				show={this.state.notification.isActive}
				position="middle-center"
				onClose={() => this.setState({ notification: { isActive: false, text: '', status: 'danger' } })}
			/>
		</>
	}
}