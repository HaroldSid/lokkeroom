import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.mjs";
import login from "./controllers/login.mjs";
import register from "./controllers/register.mjs";
import logout from "./controllers/logout.mjs";
import welcome from "./welcome.mjs";
import auth from "./middleware/auth.mjs";
import cookie from "cookie-parser";
import createLobby from "./queries/createLobby.mjs";
import postMessage from "./queries/postMessage.mjs";
import getMessage from "./queries/getMessage.mjs";
import updateMessage from "./queries/updateMessage.mjs";

dotenv.config();

dbConnect();

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cookie());

server.post("/api/register", register);
server.post("/api/login", login);
server.get("/api/lobby", auth, welcome);
server.post("/api/lobby", auth, createLobby);
server.post("/api/lobby/:lobby_id", auth, postMessage);
server.get("/api/lobby/:lobby_id", auth, getMessage);
server.get("/api/lobby/:lobby_id/:message_id", auth, getMessage);
server.patch("/api/lobby/:lobby_id/:message_id", auth, updateMessage);
server.get("/logout", auth, logout);

server.listen(port, () => console.log(`App running on port ${port}.`));
