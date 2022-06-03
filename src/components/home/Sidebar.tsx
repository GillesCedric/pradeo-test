import React from "react"
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu, SidebarFooter } from "react-pro-sidebar"
import { FaAdjust, FaFolderPlus, FaGithub, FaLanguage, FaList, FaMobileAlt, FaTachometerAlt, FaUserPlus, FaUsers } from 'react-icons/fa'
import { PageProps } from "../../pages/Page"

/**
 * @type User
 * @author Gilles Cédric
 * @description this type is used to represent the User model
 * @exports
 * @since 23/05/2022
 */
export type User = {
	id: string
	username: string
	email: string
	avatar?: string
}

/**
 * @interface SidebarProps
 * @author Gilles Cédric
 * @description this interface represent the props definition for the Sidebar component
 * @extends PageProps
 * @exports
 * @since 23/05/2022
 */
export interface SidebarProps extends PageProps {
	user?: User
	updater: (index: number) => void
}

/**
 * @class Sidebar
 * @author Gilles Cédric
 * @description this class is used to represent the Sidebar component
 * @extends React.Component
 * @exports
 * @default
 * @since 23/05/2022
 */
export default class Sidebar extends React.Component<SidebarProps> {

	/**
	 * @override
	 * @returns {JSX.Element}
	 */
	render = (): JSX.Element => {
		return <ProSidebar
			breakPoint="md"
		>
			<SidebarHeader>
				<div
					style={{
						padding: '24px',
						textTransform: 'uppercase',
						fontWeight: 'bold',
						fontSize: 14,
						letterSpacing: '1px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{this.props.user?.username}
				</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape="circle">
					<MenuItem
						icon={<FaTachometerAlt />}
						suffix={<span className="badge red">{this.props.vocabulary.add._}</span>}
					>
						{this.props.vocabulary.dashboard}
					</MenuItem>
					<SubMenu
						title={this.props.vocabulary.my_applications}
						icon={<FaMobileAlt />}
					>
						<MenuItem icon={<FaFolderPlus />}>{this.props.vocabulary.add.application}</MenuItem>
					</SubMenu>
				</Menu>
				<Menu iconShape="circle">
					<SubMenu
						title={this.props.vocabulary.users}
						icon={<FaUsers />}
					>
						<MenuItem icon={<FaUserPlus />}>{this.props.vocabulary.add.user}</MenuItem>
					</SubMenu>
					<SubMenu title={this.props.vocabulary.settings} icon={<FaList />}>
						<SubMenu title={this.props.vocabulary.language} icon={<FaLanguage />} >
							<MenuItem onClick={() => this.props.updater(1)} >{this.props.vocabulary.english}</MenuItem>
							<MenuItem onClick={() => this.props.updater(0)} >{this.props.vocabulary.french}</MenuItem>
						</SubMenu>
						<SubMenu title={'Thème'} icon={<FaAdjust />} >
							<MenuItem>Dark</MenuItem>
							<MenuItem>Light</MenuItem>
						</SubMenu>
					</SubMenu>
				</Menu>
			</SidebarContent>

			<SidebarFooter style={{ textAlign: 'center' }}>
				<div
					className="sidebar-btn-wrapper"
					style={{
						padding: '20px 24px',
					}}
				>
					<a
						href="https://github.com/azouaoui-med/react-pro-sidebar"
						target="_blank"
						className="sidebar-btn"
						rel="noopener noreferrer"
					>
						<FaGithub />
						<span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
							viewSource
						</span>
					</a>
				</div>
			</SidebarFooter>
		</ProSidebar>
	}
}