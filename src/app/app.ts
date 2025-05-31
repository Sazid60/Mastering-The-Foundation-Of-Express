import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Dunia !");
});
app.get("/todos", (req: Request, res: Response) => {
  res.send("");
});
app.post("/todos/create-todos", (req: Request, res: Response) => {
  res.send("");
});

export default app;
