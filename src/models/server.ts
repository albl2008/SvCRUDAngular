import express, { Application, Request, Response } from "express";
import cors from "cors";
import routeProduct from "../routes/product";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion corriendo en puerto ${this.port}`);
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "API Working",
      });
    });
    this.app.use("/api/productos", routeProduct);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("DB conectada");
    } catch (error) {
      console.log(error);
      console.log("Error en conexion a base de datos");
    }
  }
}

export default Server;
