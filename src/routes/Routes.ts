import { Request, Response, Application, NextFunction } from "express"
import { UserController } from "../controllers/User"
import { ApplicationController } from "../controllers/Application"
import Multer from "../middlewares/Multer"
import JWTUtils from "../utils/JWTUtils"
import * as path from 'path'
import { Socket } from "socket.io"

export class Routes {

    private readonly version = process.env.API_VERSION || 'v1'

    private readonly userController: UserController = new UserController()
    private readonly applicationController: ApplicationController = new ApplicationController()

    public routes = (app: Application) => {

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