import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps } from "../../pages/Page"

/**
 * @interface AddApplicationProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the AddApplication component
 * @extends PageProps
 * @since 31/05/2022
 */
interface AddApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: (form: FormData) => void
	onError: (error: string) => void
}

/**
 * @interface AddApplicationState
 * @author Gilles Cédric
 * @description this interface represent the state definition for the AddApplication component
 * @extends PageProps
 * @since 31/05/2022
 */
interface AddApplicationState {
	file: File | null
}

/**
 * @class AddApplication
 * @author Gilles Cédric
 * @description this class is used to represent the AddApplication component
 * @extends React.Component
 * @exports
 * @default
 * @since 31/05/2022
 */
export default class AddApplication extends React.Component<AddApplicationProps, AddApplicationState>{

	/**
	 * @constructor
	 * @param {AddApplicationProps} props the props of the component
	 */
	constructor(props: AddApplicationProps){
		super(props)
		this.state = {
			file: null
		}
	}

	/**
	 * @property defaultProps
	 * @static
	 * @description the default props of the component
	 */
	static defaultProps = {
    onSubmit: () => {},
		onClose: () => {},
		onError: () => {},
		show: true
  }

	/**
	 * @property form
	 * @description the reference for the from element
	 * @private
	 * @type {HTMLInputElement | null | undefined}
	 */
	private form: HTMLFormElement | undefined | null

	/**
	 * @method handleSubmit
	 * @description this method is used to handle the submit event of the form
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event the submit event
	 * @private
	 * @readonly
	 * @returns {void}
	 */
	private readonly handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
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