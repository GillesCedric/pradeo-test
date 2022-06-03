import * as express from 'express'
import * as bodyParser from "body-parser"
import * as cors from "cors"
import helmet from "helmet"
import Routes from "./routes/Routes"
import Initialize from "./config/database/Initialize"

/**
 * @class App
 * @author Gilles Cédric
 * @description this class is used to represent the express App instance
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class App {

    /**
     * @property _app
     * @description the express Application instance
     * @private
     * @readonly
     * @type {express.Application}
     */
    private readonly _app: express.Application = express()

    /**
     * @property _routes
     * @description the Routes instance
     * @private
     * @readonly
     * @type {Routes}
     */
    private readonly _routes: Routes = new Routes()

    /**
	 * @method get
	 * @description this method is used to get a specific express Application instance
	 * @public
	 * @static
	 * @returns {express.Application} the express Application instance
	 */
    public get app() : express.Application {
        return this._app
    }
    
    /**
     * @constructor
     */
    constructor() {
        this.config()
        this.databaseSetup()
        this._routes.routes(this.app)     
    }

    /**
     * @method config
     * @description this method is used to Initialize the basic config of the application
     * @readonly
     * @private
     * @returns {void}
     */
    private readonly config = (): void => {
        //security configuration with helmet
        this.app.use(helmet())
        
        //body parser configuration
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))

        //cors configuration
        this.app.use(cors())

        // serving static files 
        this.app.use(express.static('public'))
    }

    /**
     * @method databaseSetup
     * @description this method is used to Initialize the database
     * @readonly
     * @private
     * @returns {void}
     */
    private readonly databaseSetup = (): void => {
        //Uncomment the line below to Reinitialize the database
        //new Initialize().init()
    }

}
