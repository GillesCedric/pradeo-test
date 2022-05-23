import React from "react"
import Main from "../components/home/Main"
import Sidebar from "../components/home/Sidebar"
import { PageProps } from "./PageProps"
import '../styles/home.scss'

export default class Home extends React.Component<PageProps> {
	render = () => {
		return <>
			<Sidebar />
			<Main />
		</>
	}
}