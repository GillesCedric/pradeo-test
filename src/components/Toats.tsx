import React from "react";
import { Toast as _Toast, ToastContainer } from "react-bootstrap";
interface PropsToast {
	icon?: React.ReactNode
	variant: string
	title: string
	time?: string
	message: string
	show: boolean
	updater: () => void
}

export default class Toast extends React.Component<PropsToast>{

	constructor(props: PropsToast) {
		super(props)
	}

	render = () => {
		return <ToastContainer className="p-3" position={'bottom-end'}>
			<_Toast className="d-inline-block m-1" bg={this.props.variant.toLowerCase()} onClose={() => this.props.updater()} show={this.props.show} delay={4000} autohide >
				<_Toast.Header>
					{this.props.icon ?? <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />}
					<strong className="me-auto">{this.props.title}</strong>
					<small>{this.props.time}</small>
				</_Toast.Header>
				<_Toast.Body className={this.props.variant === 'Dark' ? 'text-white' : ''}>
					{this.props.message}
				</_Toast.Body>
			</_Toast>
		</ToastContainer>
	}
}