import { Request, Response, Application } from "express"
import UserController from "../controllers/User"
import ApplicationController from "../controllers/Application"
import Multer from "../middlewares/Multer"
import * as path from 'path'

/**
 * @class App
 * @author Gilles Cédric
 * @description this class is used to define all the routes of the application
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class Routes {

    /**
	 * @property version
	 * @description the version of the application
	 * @private
	 * @readonly
	 * @type {string}
	 */
    private readonly version: string = process.env.API_VERSION || 'v1'

    /**
	 * @property userController
	 * @description the User controller
	 * @private
	 * @readonly
	 * @type {UserController}
	 */
    private readonly userController: UserController = new UserController()

    /**
	 * @property applicationController
	 * @description the Application controller
	 * @private
	 * @readonly
	 * @type {ApplicationController}
	 */
    private readonly applicationController: ApplicationController = new ApplicationController()

    /**
	 * @method routes
	 * @description this method define all the endpoints of the application
	 * @readonly
	 * @public
	 * @returns {void}
	 */
    public readonly routes = (app: Application): void => {

        //Default endpoint
        app.route('/api/' + this.version + '/')
            .get((req: Request, res: Response) => {       
                res.status(200).sendFile(path.dirname(path.dirname(__dirname)) + '/public/index.html'.replace('/', path.sep))
            })

        //User endpoints
        app.route('/api/' + this.version + '/users')
            .get(this.userController.getAll)

        app.route('/api/' + this.version + '/users/login').post(this.userController.login)

        app.route('/api/' + this.version + '/users/register').post(this.userController.register)

        app.route('/api/' + this.version + '/users/:userId')
            .get(this.userController.get)

        app.route('/api/' + this.version + '/users/:userId/applications')
            .get(this.applicationController.get)
            .post(Multer.makeMulterUploadMiddleware(Multer.upload().single('file')), this.applicationController.add)

        app.route('/api/' + this.version + '/users/:userId/applications/:applicationId')
            .put(this.applicationController.update)
            .delete(this.applicationController.delete)
            .post(this.applicationController.verify)
            .get(this.applicationController.download)

        //Application endpoints
        app.route('/api/' + this.version + '/applications')
            .get(this.applicationController.getAll)

    }

}