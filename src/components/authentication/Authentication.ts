import React from "react"
import Cookies from "../../modules/cookies/Cookies"
import { PageProps, PageState } from '../../pages/Page'

/**
 * @interface AuthenticationProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the Authentication component
 * @extends PageState
 * @since 31/05/2022
 */
interface AuthenticationState extends PageState{
	isLoading: boolean
	redirect: boolean
}

/**
 * @class Authentication
 * @author Gilles Cédric
 * @description this class is used to represent the Authentication component
 * @extends React.Component
 * @exports
 * @default
 * @since 31/05/2022
 */
export default abstract class Authentication extends React.Component<PageProps, AuthenticationState> {

	/**
	 * @property cookies
	 * @description the Cookies instance
	 * @protected
	 * @readonly
	 * @type {Cookies}
	 */
	protected readonly cookies: Cookies = Cookies

	/**
	 * @constructor
	 * @param {PageProps} props the props of the application
	 */
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

	/**
	 * @property form
	 * @description the reference for the form element
	 * @protected
	 * @type {HTMLInputElement | undefined}
	 */
	protected form: HTMLFormElement | undefined

	/**
	 * @method handleSubmit
	 * @description this method is used to handle the submit event of the form
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event the submit event
	 * @protected
	 * @abstract
	 * @returns {void}
	 */
	protected abstract handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void

}