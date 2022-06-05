import React from 'react'
import loginImg from "../../assets/login.svg"
import Authentication from './Authentication'
import API from '../../modules/api/API'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

/**
 * @class Register
 * @author Gilles Cédric
 * @description this class is used to represent the Register component
 * @extends React.Component
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class Register extends Authentication {

	/**
	 * @method handleSubmit
	 * @description this method is used to handle the submit event of the form
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event the submit event
	 * @protected
	 * @readonly
	 * @returns {void}
	 */
	protected readonly handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (event: React.MouseEvent): void => {
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
				toast.success(this.props.vocabulary.register_success, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					})
			})
				.catch(error => {
					toast.error(error.response.data.error, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						})
				})
				.finally(() => {
					this.setState({ isLoading: false })
				})
		} else {
			toast.error(this.props.vocabulary.errors.empty, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				})
		}
	}

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
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
			<ToastContainer />
		</>
	}
}