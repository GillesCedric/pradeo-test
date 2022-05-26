import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from "dotenv"
import * as path from 'path'

export default class Config {
	private readonly _sequelize: Sequelize

	public get sequelize() : Sequelize {
		return this._sequelize
	}
	

	constructor(){
		dotenv.config()
		this._sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
			storage: process.env.DB_STORAGE.replace('/', path.sep),
			dialect: process.env.DB_DRIVER as Dialect
		})
	}
}