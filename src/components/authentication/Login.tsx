import React from 'react'
import loginImg from "../../assets/login.svg"
import Authentication from './Authentication'
import Toast from '../Toats'
import API from '../../modules/api/API'
import Cookies from '../../modules/cookies/Cookies'
import {Navigate} from 'react-router-dom'


export default class Login extends Authentication {


	protected handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (event: React.MouseEvent) => {

		event.preventDefault()
		event.stopPropagation()

		const data = new FormData(this.form)

		const username = data.get('username') as string
		const password = data.get('password') as string

		if (username.toString().length > 0 && password.toString().length > 0) {
			this.setState({isLoading: true})
			API.login({
				username,
				password
			}).then(value => {
				Cookies.set('token', value.data.token)
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
		if(this.state.redirect) return <Navigate to={'/dashboard'} />

		return <div className="base-container" >
			<div className="header">
				{this.props.vocabulary.sign_in}
			</div>
			<div className="content">
				<div className="image">
					<img src={loginImg} alt="login-img" />
				</div>
				<form className="form" ref={ref => this.form = ref as HTMLFormElement}>
					<div className="form-group">
						<label htmlFor="username">{this.props.vocabulary.username}</label>
						<input type="text" name="username" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.username}`} required />
					</div>
					<div className="form-group">
						<label htmlFor="password">{this.props.vocabulary.password}</label>
						<input type="password" name="password" placeholder={`${this.props.vocabulary.your}  ${this.props.vocabulary.password}`} required />
					</div>
					<div className="footer">
						<button disabled={this.state.isLoading} className="btn" type="submit" onClick={(event) => this.handleSubmit(event)}>
							{this.state.isLoading ? this.props.vocabulary.loading : this.props.vocabulary.sign_in}
						</button>
					</div>
				</form>
			</div>
			<div className="error">
			{this.state.error}
			</div>
		</div>
	}
}