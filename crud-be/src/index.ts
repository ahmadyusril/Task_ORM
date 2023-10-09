import * as express from "express";
import { AppDataSource } from "./data-source";
import * as cors from "cors";
import PaslonRoute from "./route/paslon";
import VoteRoute from "./route/vote";
import PartyRoute from "./route/party";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 8000;

        app.use(express.json());
        app.use("/api/v1", PaslonRoute);
        app.use("/api/v1", VoteRoute);
        app.use("/api/v1", PartyRoute);

        const options: cors.CorsOption = {
            allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false,
        }
        app.use(cors(options));
        
        app.listen(port, () => `Server started on port ${port}`)
    })
    .catch(error => console.log(error))
