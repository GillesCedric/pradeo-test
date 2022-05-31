import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps } from "../../pages/Page"
import { Application } from "./Main"

/**
 * @interface EditApplicationProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the EditApplication component
 * @extends PageProps
 * @since 31/05/2022
 */
interface EditApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: (name?: string, comment?: string) => void
	onError: (error: string) => void
	application: Application
}

/**
 * @class EditApplication
 * @author Gilles Cédric
 * @description this class is used to represent the EditApplication component
 * @extends React.Component
 * @exports
 * @default
 * @since 31/05/2022
 */
export default class EditApplication extends React.Component<EditApplicationProps>{

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
	 * @property name
	 * @description the reference for the name application input
	 * @private
	 * @type {HTMLInputElement | null | undefined}
	 */
	private name: HTMLInputElement | null | undefined

	/**
	 * @property comment
	 * @description the reference for the comment application input
	 * @private
	 * @type {HTMLInputElement | null | undefined}
	 */
	private comment: HTMLTextAreaElement | null | undefined

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

		if(this.name === null && this.comment) return
		
		const name = this.name?.value
		const comment = this.comment?.value

		this.props.onSubmit(name, comment)
			
	}

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
		return <>
			<Modal show={this.props.show} onHide={() => this.props.onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.vocabulary.add.application}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
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
								ref={(ref: HTMLInputElement | null) => this.name = ref}
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
								ref={(ref: HTMLTextAreaElement | null) => this.comment = ref}
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