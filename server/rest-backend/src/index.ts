import cors from "cors";
import express from "express";
import { delay } from "./delayMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(delay(1000));

app.get("/api/counter", (_req, res) => {
  res.json({ count: 42 });
});

app.listen(3001, () => console.log("REST backend on http://localhost:3001"));
