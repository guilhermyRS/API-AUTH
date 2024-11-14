const express = require("express");
const server = express();
const dotenv = require("dotenv");
const routes = require("./routes.js");

dotenv.config();
server.use(express.json());
server.use("/api", routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});