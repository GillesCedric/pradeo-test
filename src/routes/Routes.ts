import { Request, Response, Application, NextFunction } from "express"
import { UserController } from "../controllers/User"
import { ApplicationController } from "../controllers/Application"
import Multer from "../middlewares/Multer"
import JWTUtils from "../utils/JWTUtils"

export class Routes {

    private readonly version = process.env.API_VERSION || 'v1'

    private readonly userController: UserController = new UserController()
    private readonly applicationController: ApplicationController = new ApplicationController()

    public routes = (app: Application) => {

        //Default endpoint
        app.route('/api/' + this.version + '/')
            .get((req: Request, res: Response) => {
                res.status(200).json({
                    message: 'Bienvenue sur notre api'
                })
            })

        //User endpoints
        app.route('/api/' + this.version + '/users')
            .get(this.userController.getAll)

        app.route('/api/' + this.version + '/users/login').post(this.userController.login)

        app.route('/api/' + this.version + '/users/register').post(this.userController.register)

        app.route('/api/' + this.version + '/users/:userId')
            .get(this.userController.get)

        app.route('/api/' + this.version + '/users/:userId/applications')
            .post((req: Request, res: Response, next: NextFunction) => {

                const authorization = req.headers.authorization
                const userId = JWTUtils.getUserFromToken(authorization)

                if (userId < 0) return res.status(400).json({ error: 'Token invalide' })

                const targetUserId = Number.parseInt(req.params.userId)

                if (Number.isNaN(targetUserId) || targetUserId <= 0 || userId !== targetUserId) return res.status(400).json({ error: 'id de l\'utilisateur invalide' })

                //Multer.upload(targetUserId).single('file')

                next()
            }, Multer.upload().single('file'), this.applicationController.add)

        app.route('/api/' + this.version + '/users/:userId/applications/:applicationId')
            .put(this.applicationController.update)
            .delete(this.applicationController.delete)


        //Application endpoints
        app.route('/api/' + this.version + '/applications')
            .get(this.applicationController.getAll)

    }
}