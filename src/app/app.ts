import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { todosRouter } from "./todos/todos.routes";

const app: Application = express();

// parser
app.use(express.json());

app.use("/todos", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos App!");
});

export default app;

// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
