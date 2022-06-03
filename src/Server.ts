import App from './App'
import * as dotenv from "dotenv"

/**
 * @class Server
 * @author Gilles Cédric
 * @description this class is used to represent the Server instance, the main class of the project
 * @since 21/05/2022
 */
class Server {

    /**
     * @property app
     * @description the App instance
     * @private
     * @readonly
     * @type {App}
     */
    private readonly app: App

    /**
     * @property port
     * @description the port number of the application
     * @private
     * @readonly
     * @type {App}
     */
    private readonly port: string | number

    /**
     * @constructor
     */
    constructor() {
        dotenv.config()
        this.port = process.env.PORT || 8001
        this.app = new App()
    }

    /**
     * @method serve
     * @description this method is used to serve the application
     * @public
     * @returns {void}
     */
    public readonly serve = (): void => {

        this.app.app.listen(this.port, () => {
            console.log('Express server listening on port ' + this.port)
        })

    }
}

new Server().serve()
