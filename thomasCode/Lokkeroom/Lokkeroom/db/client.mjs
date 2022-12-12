import pkg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 5432,
});

export default client;
