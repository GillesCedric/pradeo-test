import Axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

export default class VirusToptalApi {

	private readonly API_KEY = '8bf09ed4a6d45c87b3eef27b7bfa313350a3a012d987bf555d38495e2f702c77'
	private API_FILE_URL = 'https://www.virustotal.com/api/v3/files'
	private readonly GET_API_LARGE_FILE_URL = 'https://www.virustotal.com/api/v3/files/upload_url'
	private readonly headers = {
		'x-apikey': this.API_KEY
	}
	private fileLocation: string

	constructor(hash: string, userId: number) {
		this.fileLocation = process.env.APK_STORAGE.replace('/', path.sep) + userId + path.sep + hash + '.apk'
	}

	private readonly getFileSize = () => fs.statSync(this.fileLocation).size / (1024 * 1024)

	private readonly getApplication = () => fs.createReadStream(this.fileLocation)

	public readonly verifyApplication = async () => {
		if (this.getFileSize() > 32) {
			await Axios.get(this.GET_API_LARGE_FILE_URL, {headers: this.headers})
			.then(value => {
				this.API_FILE_URL = value.data.data
			})
			.catch(error => {
				console.log(error)
			})
		}

		await Axios.post(this.API_FILE_URL, {file: this.getApplication()}, {
			headers: {
				...this.headers,
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json'
			}
		})
		.then(value => {
			console.log(value)
		})
		.catch(error => {
			console.log(error)
		})
	}

}