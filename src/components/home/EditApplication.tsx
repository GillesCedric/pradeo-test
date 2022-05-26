import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps, PageState } from "../../pages/Page"
import { Application } from "./Main"

interface EditApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: (form: FormData) => void
	onError: (error: string) => void
	application: Application
}

export default class EditApplication extends React.Component<EditApplicationProps>{

	static defaultProps = {
    onSubmit: () => {},
		onClose: () => {},
		onError: () => {},
		show: true
  }

	private form: HTMLFormElement | undefined | null

	private readonly handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		event.stopPropagation()

		if(this.form === null) return

		const form = new FormData(this.form)
		
		this.props.onSubmit(form)
			
	}

	render = () => {
		return <>
			<Modal show={this.props.show} onHide={() => this.props.onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.vocabulary.add.application}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={(form: HTMLFormElement | null) => this.form = form}>
							<Form.Label>{this.props.vocabulary.id}</Form.Label>
							<Form.Control
								type="text"
								defaultValue={this.props.application.id}
								readOnly
							/>
							<Form.Label>{this.props.vocabulary.hash}</Form.Label>
							<Form.Control
								type="text"
								defaultValue={this.props.application.hash}
								readOnly
							/>
							<Form.Label>{this.props.vocabulary.name}</Form.Label>
							<Form.Control
								type="text"
								name="name"
								defaultValue={this.props.application.name}
							/>
							<Form.Label>{this.props.vocabulary.status}</Form.Label>
							<Form.Control
								type="text"
								readOnly
								defaultValue={this.props.application.status}
							/>
							<Form.Label>{this.props.vocabulary.comment}</Form.Label>
							<Form.Control
								as={"textarea"}
								rows={4}
								name="comment"
								defaultValue={this.props.application.comment}
							/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => this.props.onClose()}>
						{this.props.vocabulary.close}
					</Button>
					<Button type="submit" variant="primary" onClick={(event) => this.handleSubmit(event)}>
						{this.props.vocabulary.save}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	}
}