import React from 'react'
import { PageProps } from '../../pages/Page'

/**
 * @interface SideProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the Side component
 * @extends PageProps
 * @since 21/05/2022
 */
interface PropsSide extends PageProps {
	containerRef: (ref: HTMLDivElement | null) => void,
	updater: () => void
	isLogin: boolean
}

/**
 * @class Side
 * @author Gilles Cédric
 * @description this class is used to represent the Side component
 * @extends React.Component
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class Side extends React.Component<PropsSide>{

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
		return <div className="right-side" ref={this.props.containerRef} onClick={() => this.props.updater()}>
			<div className="inner-container">
				<div className={this.props.isLogin ? "text-left" : "text-right"}>
					{this.props.isLogin ? this.props.vocabulary.sign_up : this.props.vocabulary.sign_in}
				</div>
			</div>
		</div>
	}
}