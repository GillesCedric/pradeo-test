import React from 'react'
import { AuthenticationProps } from '../../pages/Authentication';

interface PropsSide extends AuthenticationProps {
	containerRef: (ref: HTMLDivElement | null) => void,
	updater: () => void;
	isLogin: boolean
}
export default class Side extends React.Component<PropsSide>{

	render = () => {
		return <div className="right-side" ref={this.props.containerRef} onClick={() => this.props.updater()}>
			<div className="inner-container">
				<div className={this.props.isLogin ? "text-left" : "text-right"}>
					{this.props.isLogin ? this.props.vocabulary.sign_up : this.props.vocabulary.sign_in}
				</div>
			</div>
		</div>
	}
}