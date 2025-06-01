import express, { Request, Response } from "express";

import { client } from "../../config/mongodb";

export const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  // console.log(db);
  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
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
