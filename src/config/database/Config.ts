import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from "dotenv"
import * as path from 'path'

/**
 * @class Config
 * @author Gilles Cédric
 * @description this class is used to config the database with the Sequelize ORM
 * @exports
 * @default
 * @since 22/05/2022
 */
export default class Config {

	/**
   * @property _sequelize
   * @description the sequelize instance
   * @private
   * @readonly
   * @type {Sequelize}
   */
	private readonly _sequelize: Sequelize

	/**
	 * @method get
	 * @description this method is used to get the sequelize instance
	 * @public
	 * @static
	 * @returns {Sequelize}
	 */
	public get sequelize() : Sequelize {
		return this._sequelize
	}
	
	/**
	 * @constructor
	 */
	constructor(){
		dotenv.config()
		this._sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
			storage: process.env.DB_STORAGE.replace('/', path.sep),
			dialect: process.env.DB_DRIVER as Dialect
		})
	}
}