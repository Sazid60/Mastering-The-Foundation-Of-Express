import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();
app.use(express.json());

const filePath = path.join(__dirname, "../../db/todos.json");

// console.log(filePath);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos App!");
});
app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;

  res.json("Created");
});

export default app;
