import axios from "axios"

export default class API {
	private static readonly apiUrl = 'http://localhost:8000/api/v1/'

	public static get:  () => Promise<any> = async () => {
		return await axios.get(this.apiUrl)
	}

	public static login:  (data: any) => Promise<any> = async (data: any) => {
		return await axios.post(this.apiUrl + 'users/login', data)
	}
}