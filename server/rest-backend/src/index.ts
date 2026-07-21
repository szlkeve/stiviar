import express from "express";
import { delay } from "./delayMiddleware";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(delay(1000));

app.get("/api/user", (_req, res) => {
  res.json({ id: 1, name: "John" });
});

app.get("/api/movies", (_req, res) => {
  res.json([{ id: 1, title: "hi", year: 1998 }]);
});

app.listen(3001, () => console.log("REST backend on http://localhost:3001"));
