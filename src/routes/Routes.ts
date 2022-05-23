import { Request, Response, Application } from "express"
import { UserController } from "../controllers/User"
import { ApplicationController } from "../controllers/Application"

export class Routes {

    private readonly version = process.env.API_VERSION || '/v1'

    public userController: UserController = new UserController()
    public applicationController: ApplicationController = new ApplicationController()

    public routes = (app: Application) => {

        app.route('/api' + this.version + '/')
            .get((req: Request, res: Response) => {
                res.status(200).json({
                    message: 'Bienvenue sur notre api'
                })
            })

        app.route('/api' + this.version + '/users')
            .get(this.userController.getAll)
            .post(this.userController.add)

        app.route('/api' + this.version + '/users/login').post(this.userController.login)

        app.route('/api' + this.version + '/users/register').post(this.userController.register)

        app.route('/api' + this.version + '/users/:user')
            .get(this.userController.get)
            .put(this.userController.update)
            .delete(this.userController.delete)

        app.route('/api' + this.version + '/users/register').put(this.userController.update)

    }
}