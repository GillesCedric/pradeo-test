import React from "react";
import { Toast as _Toast, ToastContainer } from "react-bootstrap";
import { ToastPosition } from "react-bootstrap/esm/ToastContainer";
import { Lang } from "../modules/language/lang";
interface PropsToast {
	icon?: React.ReactNode
	variant: string
	title: string
	time?: string
	message: string
	show: boolean
	position: ToastPosition
	vocabulary: Lang
	onClose: () => void
}

export default class Toast extends React.Component<PropsToast>{

	static defaultProps = {
    onClose: () => {},
		position: 'bottom-end',
		show: true
  }

	render = () => {
		return <ToastContainer className="p-3" position={this.props.position} style={{position: 'absolute'}}>
			<_Toast
				className="d-inline-block m-1"
				bg={this.props.variant.toLowerCase()}
				onClose={() => this.props.onClose()}
				show={this.props.show} delay={4000}
				autohide >
				<_Toast.Header>
					{this.props.icon ?? <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />}
					<strong className="me-auto">{this.props.title}</strong>
					<small>{this.props.time}</small>
				</_Toast.Header>
				<_Toast.Body className={this.props.variant.toLowerCase() === 'dark' ? 'text-white' : ''}>
					{this.props.message}
				</_Toast.Body>
			</_Toast>
		</ToastContainer>
	}
}