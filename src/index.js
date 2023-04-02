import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
import { router as personRouter } from "./routes/person.routes.js";

app.get("/", (req, res) => {
  res.send("Welcome to the best CRUD API implemented using redis 😎😎😎");
});

app.use("/api", personRouter);
const port = process.env.PORT;

app.listen(port, () => console.log("Server up and running"));
