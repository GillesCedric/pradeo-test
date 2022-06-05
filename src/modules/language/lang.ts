/**
 * @class Lang
 * @author Gilles Cédric
 * @description this class is the Lang component witch used to handle the languages of the application
 * @abstract
 * @exports
 * @since 21/05/2022
 */
export abstract class Lang {

	/**
	 * @property _identifier
	 * @description the identifier of the language (fr,en,de...)
	 * @protected
	 * @readonly
	 * @type {string}
	 */
	protected readonly _identifier: string

	/**
	 * @property _name
	 * @description the name of the language (français,anglais...)
	 * @protected
	 * @readonly
	 * @type {string}
	 */
	protected readonly _name: string

	/**
	 * @constructor
	 * @param {string} identifier the identifier of the language
	 * @param {string} name the name of the language
	 */
	constructor(identifier: string, name: string) {
		this._identifier = identifier
		this._name = name
	}

	/**
	 * @method langName
	 * @description the getter for the name property
	 * @public
	 * @returns {string} the name of the application
	 */
	public get langName(): string {
		return this._name
	}

	/**
	 * @method identifier
	 * @description the getter for the identifier property
	 * @public
	 * @returns {string} the identifier of the application
	 */
	public get identifier(): string {
		return this._name
	}

	abstract readonly sign_in: string
	abstract readonly username: string
	abstract readonly password: string
	abstract readonly mail: string
	abstract readonly sign_up: string
	abstract readonly your: string
	abstract readonly loading: string
	abstract readonly errors: {
		empty: string
	}
	abstract readonly add: {
		_: string
		user: string
		application: string
	}
	abstract readonly delete: {
		_: string
		user: string
		application: string
	}
	abstract readonly dashboard: string
	abstract readonly users: string
	abstract readonly my_applications: string
	abstract readonly settings: string
	abstract readonly language: string
	abstract readonly update: string
	abstract readonly english: string
	abstract readonly french: string
	abstract readonly error: string
	abstract readonly notification: string
	abstract readonly close: string
	abstract readonly save: string
	abstract readonly download_apk: string
	abstract readonly register_success: string
	abstract readonly cancel: string
	abstract readonly id: string
	abstract readonly name: string
	abstract readonly hash: string
	abstract readonly comment: string
	abstract readonly status: string
	abstract readonly actions: string
	abstract readonly applications_empty: string
	abstract readonly delete_application: string
	abstract readonly view_source: string
	abstract readonly dark: string
	abstract readonly light: string
	abstract readonly my_account: string
	abstract readonly my_profile: string
	abstract readonly sign_out: string
}