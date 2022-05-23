export abstract class Lang {
	public readonly identifier: string
	public readonly name: string

	constructor(identifier: string, name: string) {
		this.identifier = identifier
		this.name = name
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
	abstract readonly page_not_found: string
	abstract readonly lost: string
}