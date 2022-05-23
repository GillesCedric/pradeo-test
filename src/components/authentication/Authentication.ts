import React from "react"
import Cookies from "../../modules/cookies/Cookies";
import { PageProps } from '../../pages/PageProps';
import Toast from "../Toats";

export default abstract class Authentication extends React.Component<PageProps, {isLoading: boolean, error: string, redirect: boolean}> {

	protected readonly cookies = Cookies

	constructor(props: PageProps){
		super(props)
		this.state = {
			isLoading : false,
			error : '',
			redirect: false
		}
		
		
	}

	protected form: HTMLFormElement | undefined

	protected abstract handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void

}