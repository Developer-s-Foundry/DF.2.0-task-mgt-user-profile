import { Application, json, urlencoded} from "express";


export const expressConfig = async (app: Application): Promise<void> => {
    app.use(
        urlencoded({
            extended: true,
        })
    );
    app.use(json());
}

