import { Application, json, urlencoded} from "express";
import { RegisterRoutes } from "../../routes/routes";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../../build/swagger.json"


export const expressConfig = async (app: Application): Promise<void> => {
    app.use(
        urlencoded({
            extended: true,
        })
    );
    app.use(json());
    app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
        return res.send(
            swaggerUi.generateHTML(swaggerDoc)
        );
    });
    RegisterRoutes(app)
}
