import * as express from "express"
import { AppDataSource } from "./data-source"
import router from "./route"
import * as cors from "cors"

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 5000;

        app.use(express.json());
        app.use("/api/v1", router);

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
