import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps } from "../../pages/Page"

/**
 * @interface DeleteApplicationProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the DeleteApplication component
 * @extends PageProps
 * @since 25/05/2022
 */
interface DeleteApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: () => void
	onError: (error: string) => void
}

/**
 * @class DeleteApplication
 * @author Gilles Cédric
 * @description this class is used to represent the DeleteApplication component
 * @extends React.Component
 * @exports
 * @default
 * @since 25/05/2022
 */
export default class DeleteApplication extends React.Component<DeleteApplicationProps>{

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
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
		return <>
			<Modal show={this.props.show} onHide={() => this.props.onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.vocabulary.delete.application}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>{this.props.vocabulary.delete_application}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={() => this.props.onSubmit()}>
						{this.props.vocabulary.delete.application}
					</Button>
					<Button type="button" variant="primary" onClick={() => this.props.onClose()}>
						{this.props.vocabulary.cancel}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	}
}