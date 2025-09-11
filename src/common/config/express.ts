import { Application, json } from "express";


const expressConfig = async (app: Application): Promise<void> => {
    app.use(json());
}

export default expressConfig;