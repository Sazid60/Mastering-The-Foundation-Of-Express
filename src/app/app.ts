import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./todos/todos.routes";

const app: Application = express();

// parser
app.use(express.json());

app.use("/todos", todosRouter);

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Consoling From Middleware");
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
    });
    next();
  },
  (req: Request, res: Response) => {
    res.send("Welcome to Todos App!");
  }
);

export default app;

// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
