import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "../../modules/cookies/Cookies"

/**
 * @class Logout
 * @author Gilles Cédric
 * @description this class is used to represent the Logout component
 * @extends React.Component
 * @exports
 * @default
 * @since 05/06/2022
 */
export class Logout extends React.Component {

	/**
	 * @override
	 * @returns {React.ReactNode}
	 */
	render = (): React.ReactNode => {
		if(Cookies.get('user')) Cookies.remove('user')
		return <Navigate to="/authenticate" />
		
	}
}