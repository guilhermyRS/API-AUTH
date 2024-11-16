const express = require("express");
const server = express();
const dotenv = require("dotenv");
const Routes = require("./Routes.js");

dotenv.config();
server.use(express.json());
server.use("/api", Routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});