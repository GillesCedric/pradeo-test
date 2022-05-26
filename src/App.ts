import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"

import { Routes } from "./routes/Routes"
import Initialize from "./config/database/Initialize";

export default class App {

    private readonly app: express.Application = express();
    private readonly routes: Routes = new Routes();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb';  
    private readonly mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';

    public get express() : express.Application {
        return this.app
    }
    
    constructor() {
        this.config();
        this.databaseSetup();
        this.routes.routes(this.app);     
    }

    private config(): void{
        //body parser configuration
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //cors configuration
        this.app.use(cors())

        // serving static files 
        this.app.use(express.static('public'));
    }

    private databaseSetup(): void{
        //Uncomment the line below to Initialize the database
        //new Initialize().init()
    }

}
