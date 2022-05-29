import Axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

export default class VirusToptalApi {

	private readonly API_KEY = '8bf09ed4a6d45c87b3eef27b7bfa313350a3a012d987bf555d38495e2f702c77'
	private UPLOAD_FILE_URL = 'https://www.virustotal.com/api/v3/files'
	private readonly GET_UPLOAD_LARGE_FILE_URL = 'https://www.virustotal.com/api/v3/files/upload_url'
	private readonly ANALYSIS_DETAILS_URL = 'https://www.virustotal.com/api/v3/analyses/{id}'
	private readonly headers = {
		'x-apikey': this.API_KEY
	}
	private fileLocation: string
	private analysisId: string | undefined

	constructor(hash: string, userId: number) {
		this.fileLocation = process.env.APK_STORAGE.replace('/', path.sep) + userId + path.sep + hash + '.apk'
	}

	private readonly getFileSize = () => fs.statSync(this.fileLocation).size / (1024 * 1024)

	private readonly getApplication = () => fs.createReadStream(this.fileLocation)

	private readonly getLargeFileUploadUrl = async () => await Axios.get(this.GET_UPLOAD_LARGE_FILE_URL, { headers: this.headers })

	public readonly uploadApplication = async () => {

		if (this.getFileSize() > 32) {
			await this.getLargeFileUploadUrl()
				.then(value => {
					this.UPLOAD_FILE_URL = value.data.data
				})
				.catch(error => {
					console.log(error)
				})
		}

		await Axios.post(this.UPLOAD_FILE_URL, { file: this.getApplication() }, {
			headers: {
				...this.headers,
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json'
			},
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		})
			.then(value => {
				console.log('id analysis '+value.data.data.id)
				this.analysisId = value.data.data.id
			})
			.catch(error => {
				console.log(error)
			})
	}

	public readonly verifyApplication = async () => Axios.get(this.ANALYSIS_DETAILS_URL.replace('{id}', this.analysisId), { headers: { ...this.headers } })

}