import React from "react";
import { FaBars, FaGem, FaGithub, FaHeart, FaList, FaRegLaughWink, FaTachometerAlt } from 'react-icons/fa'


export default class Main extends React.Component {
	render = () => {
		return <>
			<main>
				<div className="btn-toggle">
					<FaBars />
				</div>
				<header>
					
					<p>description</p>
					<div className="social-bagdes">
						<a
							href="https://github.com/azouaoui-med/react-pro-sidebar"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								alt="GitHub stars"
								src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
							/>
						</a>
						<a
							href="https://github.com/azouaoui-med/react-pro-sidebar"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								alt="GitHub forks"
								src="https://img.shields.io/github/forks/azouaoui-med/react-pro-sidebar?style=social"
							/>
						</a>
					</div>
				</header>
				<div className="block ">

					<span> collapsed</span>
				</div>
				<div className="block">

					<span> rtl</span>
				</div>
				<div className="block">
					<span> image</span>
				</div>

				<footer>
					<small>
						© {new Date().getFullYear()} made with <FaHeart style={{ color: 'red' }} /> by -{' '}
						<a target="_blank" rel="noopener noreferrer" href="https://azouaoui.netlify.com">
							Mohamed Azouaoui
						</a>
					</small>
					<br />
					<div className="social-bagdes">
						<a href="https://github.com/azouaoui-med" target="_blank" rel="noopener noreferrer">
							<img
								alt="GitHub followers"
								src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social"
							/>
						</a>
						<a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">
							<img
								alt="Twitter Follow"
								src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social"
							/>
						</a>
					</div>
				</footer>
			</main>
		</>
	}
}