import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";

export default class App {

    private readonly _express: express.Application = express();
    private readonly _routePrv: Routes = new Routes();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb';  
    private readonly _mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';

    public get express() : express.Application {
        return this._express
    }
    
    constructor() {
        this.config();
        this.databaseSetup();
        this._routePrv.routes(this._express);     
    }

    private config(): void{
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this._express.use(express.static('public'));
    }

    private databaseSetup(): void{
               
    }

}
