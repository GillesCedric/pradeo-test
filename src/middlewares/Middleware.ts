import { Application } from "express"

export default class Middleware {
		private readonly version = process.env.API_VERSION || '/v1'
    private readonly apiPrefixUrl = '/api' + this.version

		constructor(){

		}

		public init = (app: Application) => {
			app.use(this.apiPrefixUrl + '/', (req, res, next) => {
				next()
			})
		}
}