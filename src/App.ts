import express from 'express';
import { router } from './routes/router';

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountainRoutes();
    }

    public mountainRoutes() {
        this.express.use('/', router);
    }
}

export default new App().express;