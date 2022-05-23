import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "../../modules/cookies/Cookies"

export class ProtectedPage extends React.Component<{children?: React.ReactNode}> {
	render = () => {
		if (Cookies.get('token')) {
			return this.props.children
		}
		return <Navigate to="/authenticate" />
		
	}
}