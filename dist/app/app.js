"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
const todosRouter = express_1.default.Router();
app.use("/todos", todosRouter); // telling app to direct the request to todosRouter if and "/request is found"
const filePath = path_1.default.join(__dirname, "../../db/todos.json");
// console.log(filePath);
todosRouter.get("/all-todos", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log(data);
    res.json({
        message: "All Todos From Todos Router",
        data,
    });
});
app.get("/", (req, res) => {
    res.send("Welcome to Todos App!");
});
app.get("/todos/all-todos", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log("From Params", req.params);
    console.log("From Query", req.query);
    res.json(data);
});
app.post("/todos/create-todo", (req, res) => {
    const { title, body } = req.body;
    res.json("Created");
});
exports.default = app;
// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
