import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "../../modules/cookies/Cookies"

/**
 * @class ProtectedPage
 * @author Gilles Cédric
 * @description this class is used to represent the ProtectedPage component
 * @extends React.Component
 * @exports
 * @default
 * @since 23/05/2022
 */
export class ProtectedPage extends React.Component<{children?: React.ReactNode}> {

	/**
	 * @override
	 * @returns {React.ReactNode}
	 */
	render = (): React.ReactNode => {
		if (Cookies.get('user')) {
			return this.props.children
		}
		return <Navigate to="/authenticate" />
		
	}
}