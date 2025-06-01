"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.todosRouter = express_1.default.Router();
const filePath = path_1.default.join(__dirname, "../../../db/todos.json");
exports.todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log(data);
    res.json({
        message: "All Todos From Todos Router",
        data,
    });
});
exports.todosRouter.post("/create-todo", (req, res) => {
    const { title, body } = req.body;
    //   title
    //   description
    //   priority : high medium low
    // isCompleted : true
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
