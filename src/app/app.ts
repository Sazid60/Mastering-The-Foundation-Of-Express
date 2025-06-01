import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();

// parser
app.use(express.json());

const todosRouter = express.Router();
app.use("/todos", todosRouter); // telling app to direct the request to todosRouter if and "/request is found"

const filePath = path.join(__dirname, "../../db/todos.json");

// console.log(filePath);

todosRouter.get("/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.json({
    message: "All Todos From Todos Router",
    data,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos App!");
});

app.get("/todos/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From Params", req.params);
  console.log("From Query", req.query);
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;

  res.json("Created");
});

export default app;

// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
