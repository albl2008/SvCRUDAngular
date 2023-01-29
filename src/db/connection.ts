import { Sequelize } from "sequelize";

const sequelize = new Sequelize("meanproducts", "albl", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
