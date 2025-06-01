import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./todos/todos.routes";

const app: Application = express();

// parser
app.use(express.json());

app.use("/todos", todosRouter);

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Consoling From Middleware");
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
    });
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Welcome to Todos App!");
    } catch (error) {
      next(error);
    }
  }
);
app.get("/error", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Welcome to Todos App!");
  } catch (error) {
    next(error);
  }
});

// undefined route error handler. this is not error its just a mismatch of the routes. so we do not have to send to global error handler

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route Not Found !",
  });
});
// Custom global error handler

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error:", error);
    res.status(400).json({
      message: "Something went Wrong From Global error handler!",
      error,
    });
  }
});

export default app;

// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
