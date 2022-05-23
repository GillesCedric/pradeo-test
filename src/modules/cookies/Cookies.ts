import {Cookies as _Cookies} from 'react-cookie'

export default class Cookies {
	
	private static readonly _cookies: _Cookies = new _Cookies()
	private static readonly duration = 60 * 60 * 24

	public static readonly get = (name: string) => {
		return this._cookies.get(name)
	}

	public static readonly getAll = () => {
		return this._cookies.getAll()
	}

	public static readonly set = (name: string, value: string | number) => {
		return this._cookies.set(name, value, {maxAge: this.duration})
	}

	public static readonly remove = (name: string) => {
		return this._cookies.remove(name)
	}
}