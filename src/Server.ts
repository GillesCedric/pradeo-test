import App from './App';

class Server {
    private readonly app: App;
    private readonly port = process.env.PORT || 8000

    constructor(){
        this.app = new App()
    }

    public serve = () => {
        this.app.express.listen(this.port, () => {
            console.log('Express server listening on port ' + this.port)
        })
    }
}

new Server().serve()