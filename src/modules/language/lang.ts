export abstract class Lang {
	protected readonly _identifier: string
	protected readonly _name: string

	constructor(identifier: string, name: string) {
		this._identifier = identifier
		this._name = name
	}

	public get langName() : string {
		return this._name
	}

	public get identifier() : string {
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
}