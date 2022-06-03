import User from '../../models/User'
import Application from '../../models/Application'

/**
 * @class Initialize
 * @author Gilles Cédric
 * @description this class is used to initialize the database
 * @exports
 * @default
 * @since 22/05/2022
 */
export default class Initialize {

	/**
   * @property devEnvironment
   * @description the if the environment is in the development mode
   * @private
   * @readonly
   * @type {boolean}
   */
	private readonly devEnvironment: boolean = process.env.NODE_ENV === 'development'

	/**
   * @property _init
   * @description the initializator of the database
   * @private
   * @readonly
   * @returns {void}
   */
	private readonly _init: () => void

	/**
	 * @method get
	 * @description this method is used to get the _init instance
	 * @public
	 * @returns {Sequelize}
	 */
	public get init() : () => void {
		return this._init
	}
	
	/**
	 * @constructor
	 */
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