import axios from "axios"
import Cookies from "../cookies/Cookies"
import Crypto from "../crypto/Crypto"

export default class API {
	private static readonly apiUrl = 'http://localhost:8000/api/v1/'
	private static readonly tokenPrefix = 'Bearer'

	public static readonly getAllUsers: () => Promise<any> = async () => {
		return await axios.get(this.apiUrl + 'users')
	}

	public static readonly login: (data: any) => Promise<any> = async (data: any) => {
		return await axios.post(this.apiUrl + 'users/login', data)
	}

	public static readonly register: (data: any) => Promise<any> = async (data: any) => {
		return await axios.post(this.apiUrl + 'users/register', data)
	}

	public static readonly getAllForUser: (id?: number) => Promise<any> = async (id?: number) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		if (id === undefined) id = userId
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.get(this.apiUrl + 'users/' + userId, {
			headers: {
				authorization: authorization
			}
		})
	}

	public static readonly getAllApplications: () => Promise<any> = async () => {
		return await axios.get(this.apiUrl + 'applications')
	}

	public static readonly addApplication: (data: FormData) => Promise<any> = async (data: FormData) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.post(this.apiUrl + 'users/' + userId + "/applications", data, {
			headers: {
				authorization: authorization,
				"Content-Type": "multipart/form-data"
			}
		})
	}

	public static readonly getApplication: () => Promise<any> = async () => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.get(this.apiUrl + 'users/' + userId + "/applications", {
			headers: {
				authorization: authorization
			}
		})
	}

	public static readonly updateApplication: (applicationId: string | number, name?: string, comment?: string) => Promise<any> = async (applicationId: string | number, name?: string, comment?: string) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.put(this.apiUrl + 'users/' + userId + "/applications/" + applicationId, { name, comment }, {
			headers: {
				authorization: authorization
			}
		})
	}

	public static readonly deleteApplication: (applicationId: string | number) => Promise<any> = async (applicationId: string | number) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.delete(this.apiUrl + 'users/' + userId + "/applications/" + applicationId, {
			headers: {
				authorization: authorization
			}
		})
	}

	public static readonly verifyApplication: (applicationId: string | number, hash: string) => Promise<any> = async (applicationId: string | number, hash: string) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.post(this.apiUrl + 'users/' + userId + "/applications/" + applicationId,{hash: hash},
			{
				headers: {
					authorization: authorization
				}
			})
	}

	public static readonly downloadApplication: (applicationId: string | number) => Promise<any> = async (applicationId: string | number) => {
		const { token, userId } = Crypto.decrypt(Cookies.get('user'))
		const authorization = this.tokenPrefix + ' ' + token
		return await axios.get(this.apiUrl + 'users/' + userId + "/applications/" + applicationId, {
			headers: {
				authorization: authorization
			}
		})
	}

}