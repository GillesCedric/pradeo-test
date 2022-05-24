import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps, PageState } from "../../pages/Page"

interface AddApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: (form: FormData) => void
}

interface AddApplicationState extends PageState {
	file: any | null
}

export default class AddApplication extends React.Component<AddApplicationProps, AddApplicationState>{

	static defaultProps = {
    onSubmit: () => {},
		onClose: () => {},
		show: true
  }

	private form: HTMLFormElement | undefined | null

	private readonly handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()
		event.stopPropagation()

		if(this.form === null) return

		const form = new FormData(this.form)

		form.append('file', this.state.file, this.state.file.name)
		console.log(this.state.file)
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
							<Form.Label>{this.props.vocabulary.download_apk}</Form.Label>
							<Form.Control
								type="file"
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({file: event.target.files !== null ? event.target.files[0] : null})}
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