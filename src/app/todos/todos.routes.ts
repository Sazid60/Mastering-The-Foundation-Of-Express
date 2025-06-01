import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const todosRouter = express.Router();
const filePath = path.join(__dirname, "../../../db/todos.json");

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.json({
    message: "All Todos From Todos Router",
    data,
  });
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;

  res.json("Created");
});

// todosRouter.get(":/title", (req: Request, res: Response) => {
//   res.json("");
// });

// todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
//   res.json("");
// });

// todosRouter.delete("delete-todo/:title", (req: Request, res: Response) => {
//   res.json("");
// });
