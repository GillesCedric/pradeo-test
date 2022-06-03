import Axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

/**
 * @class VirusToptalApi
 * @author Gilles Cédric
 * @description this class is used to handle the communication with the VirusTotalApi
 * @exports
 * @default
 * @since 26/05/2022
 */
export default class VirusTotalApi {

	/**
	 * @property API_KEY
	 * @description the api key of the virus total free account
	 * @private
	 * @readonly
	 * @type {string}
	 */
	private readonly API_KEY: string = '8bf09ed4a6d45c87b3eef27b7bfa313350a3a012d987bf555d38495e2f702c77'

	/**
	 * @property UPLOAD_FILE_URL
	 * @description the upload url of the virus total api
	 * @private
	 * @readonly
	 * @type {string}
	 */
	private UPLOAD_FILE_URL: string = 'https://www.virustotal.com/api/v3/files'

	/**
	 * @property GET_UPLOAD_LARGE_FILE_URL
	 * @description the upload large file url of the virus total api
	 * @private
	 * @readonly
	 * @type {string}
	 */
	private readonly GET_UPLOAD_LARGE_FILE_URL: string = 'https://www.virustotal.com/api/v3/files/upload_url'

	/**
	 * @property ANALYSIS_DETAILS_URL
	 * @description the analysis url of the virus total api
	 * @private
	 * @readonly
	 * @type {string}
	 */
	private readonly ANALYSIS_DETAILS_URL: string = 'https://www.virustotal.com/api/v3/analyses/{id}'

	/**
	 * @property headers
	 * @description the headers for the request
	 * @private
	 * @readonly
	 * @type {{'x-apikey': string}}
	 */
	private readonly headers: { 'x-apikey': string } = {
		'x-apikey': this.API_KEY
	}

	/**
	 * @property fileLocation
	 * @description the the file location
	 * @private
	 * @type {string}
	 */
	private fileLocation: string

	/**
	 * @property analysisId
	 * @description the analysisId returned by the virus total api
	 * @private
	 * @type {string | undefined}
	 */
	private analysisId: string | undefined

	/**
	 * @constructor
	 * @param {string} hash the hash of the application
	 * @param {number} userId the id of the user 
	 */
	constructor(hash: string, userId: number) {
		this.fileLocation = process.env.APK_STORAGE.replace('/', path.sep) + userId + path.sep + hash + '.apk'
	}

	/**
	 * @method getFileSize
	 * @description this method is used to a file size
	 * @readonly
	 * @private
	 * @returns {number}
	 */
	private readonly getFileSize = (): number => fs.statSync(this.fileLocation).size / (1024 * 1024)

	/**
	 * @method getApplication
	 * @description this method is used to send a file from the file system to the api
	 * @readonly
	 * @private
	 * @returns {fs.ReadStream}
	 */
	private readonly getApplication = (): fs.ReadStream => fs.createReadStream(this.fileLocation)

	/**
	 * @method getLargeFileUploadUrl
	 * @description this method is used to get the uri for uploading large file from the virus total api
	 * @readonly
	 * @async
	 * @private
	 * @returns {Promise<any>}
	 */
	private readonly getLargeFileUploadUrl = async (): Promise<any> => await Axios.get(this.GET_UPLOAD_LARGE_FILE_URL, { headers: this.headers })

	/**
	 * @method getLargeFileUploadUrl
	 * @description this method is used to upload an application to the virus total api
	 * @readonly
	 * @async
	 * @public
	 * @returns {Promise<any>}
	 */
	public readonly uploadApplication = async (): Promise<any> => {

		//if the file size is greather than 32MB, we have to get a special url for uploading large file
		if (this.getFileSize() > 32) {
			await this.getLargeFileUploadUrl()
				.then(value => {
					this.UPLOAD_FILE_URL = value.data.data
				})
				.catch(error => {
					console.log(error)
				})
		}

		//here we upload the file
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
				this.analysisId = value.data.data.id
			})
			.catch(error => {
				console.log(error)
			})
	}

	/**
	 * @method verifyApplication
	 * @description this method is used to verify an application with getting the details of it's scan from the analysis url
	 * @readonly
	 * @async
	 * @private
	 * @returns {Promise<any>}
	 */
	public readonly verifyApplication = async (): Promise<any> => Axios.get(this.ANALYSIS_DETAILS_URL.replace('{id}', this.analysisId), { headers: { ...this.headers } })

}