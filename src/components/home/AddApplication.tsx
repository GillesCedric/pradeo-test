import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps, PageState } from "../../pages/Page"

interface AddApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: (form: FormData) => void
	onError: (error: string) => void
}

interface AddApplicationState {
	file: File | null
}

export default class AddApplication extends React.Component<AddApplicationProps, AddApplicationState>{

	constructor(props: AddApplicationProps){
		super(props)
		this.state = {
			file: null
		}
	}

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

		if(this.state.file != null ) {
			form.append('file', this.state.file, this.state.file.name)
			this.props.onSubmit(form)
		}else{
			this.props.onError('Aucune application n\'a été sélectionnée')
		}
			
	}

	render = () => {
		return <>
			<Modal show={this.props.show} onHide={() => this.props.onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.vocabulary.add.application}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={(form: HTMLFormElement | null) => this.form = form} encType='multipart/form-data'>
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