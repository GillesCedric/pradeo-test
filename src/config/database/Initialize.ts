import User from '../../models/User'
import Application from '../../models/Application'
export default class Initialize {
	private readonly devEnvironment = process.env.NODE_ENV === 'development'
	private readonly _init: () => void

	
	public get init() : () => void {
		return this._init
	}
	

	constructor(){
		this._init = () => {
			User.sync({
				alter: this.devEnvironment
			})
			Application.sync({
				alter: this.devEnvironment
			})
		}
	}
}