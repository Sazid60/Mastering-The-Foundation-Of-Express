"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./todos/todos.routes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.todosRouter);
app.get("/", (req, res, next) => {
    console.log("Consoling From Middleware");
    console.log({
        url: req.url,
        method: req.method,
        header: req.header,
    });
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Welcome to Todos App!");
    }
    catch (error) {
        next(error);
    }
}));
app.get("/error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Welcome to Todos App!");
    }
    catch (error) {
        next(error);
    }
}));
// undefined route error handler. this is not error its just a mismatch of the routes. so we do not have to send to global error handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route Not Found !",
    });
});
// Custom global error handler
app.use((error, req, res, next) => {
    if (error) {
        console.log("Error:", error);
        res.status(400).json({
            message: "Something went Wrong From Global error handler!",
            error,
        });
    }
});
exports.default = app;
// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
