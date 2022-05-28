import express = require('express')
import { Socket } from "socket.io"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import helmet from "helmet"
import { Routes } from "./routes/Routes"
import Initialize from "./config/database/Initialize"

export default class App {

    private readonly _app: express.Application = express()
    private readonly _routes: Routes = new Routes()

    public get app() : express.Application {
        return this._app
    }
    
    constructor() {
        this.config();
        this.databaseSetup();
        this._routes.routes(this.app);     
    }

    private config(): void{
        //security configuration with helmet
        this.app.use(helmet())
        
        //body parser configuration
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //cors configuration
        this.app.use(cors())

        // serving static files 
        this.app.use(express.static('public'));
    }

    private databaseSetup(): void{
        //Uncomment the line below to Reinitialize the database
        //new Initialize().init()
    }

}
