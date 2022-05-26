import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Lang } from "../../modules/language/lang"
import { PageProps } from "../../pages/Page"

interface DeleteApplicationProps extends PageProps {
	show: boolean
	vocabulary: Lang
	onClose: () => void
	onSubmit: () => void
	onError: (error: string) => void
}

export default class DeleteApplication extends React.Component<DeleteApplicationProps>{

	static defaultProps = {
    onSubmit: () => {},
		onClose: () => {},
		onError: () => {},
		show: true
  }

	render = () => {
		return <>
			<Modal show={this.props.show} onHide={() => this.props.onClose()}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.vocabulary.delete.application}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Voulez vous vraiment supprimer cette application ?</p>
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