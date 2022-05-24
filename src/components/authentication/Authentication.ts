import React from "react"
import Cookies from "../../modules/cookies/Cookies"
import { PageProps, PageState } from '../../pages/Page'

interface AuthenticationState extends PageState{
	isLoading: boolean
	redirect: boolean
}
export default abstract class Authentication extends React.Component<PageProps, AuthenticationState> {

	protected readonly cookies = Cookies

	constructor(props: PageProps){
		super(props)
		this.state = {
			isLoading : false,
			redirect: false,
			notification: {
				status: 'danger',
				isActive: false,
				text: ''
			}
		}
		
	}

	protected form: HTMLFormElement | undefined

	protected abstract handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void

}