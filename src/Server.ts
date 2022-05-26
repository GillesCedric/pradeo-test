import App from './App'
import * as dotenv from "dotenv"

class Server {
    private readonly app: App
    private readonly port: string | number

    constructor(){
        dotenv.config()
        this.port = process.env.PORT || 8001
        this.app = new App()
    }

    public serve = () => {
        this.app.express.listen(this.port, () => {
            console.log('Express server listening on port ' + this.port)
        })
    }
}

new Server().serve()