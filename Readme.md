# Mastering The Foundation Of Express.

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/NodeJS-Fundamentals-L2B5/tree/main/module-3

## 14-1 Introduction to Express: Why & How to Get Started

- **Express is fast, unopinionated, minimalist web framework for node.js**
- For doing operation using node.js we had to follow a lot of steps. and this is resolved by express.js
- we can build web server in fastest time using express.js
- Express gives us some function which manages complex tasks of node.js and tell us that bro use it as you like.
- Express build an abstraction over node.js and created a framework.
- we have other frameworks based on node.js are nest.js which is opinionated means strict rules are set.

#### Why we use express?

1. **Complex Routing**
2. **Easier Handling Of Request and Response**
3. **Middleware to handle Complex Logic**
4. **Easier Handling Of Error**

## 14-2 Creating Basic Web server with Express

[Express.js Docs](https://expressjs.com/en/starter/installing.html)

- express Installation steps with Typescript

- **Step-1 :** initiate

```
npm init -y
```

- **Step-2 :** Install Typescript In Dev Dependency. Dev Dependency means This package will not be used in production. It will be used in development time. Ts has no works in live site, its just for developers.

```
npm install -D typescript
```

- **Step-3 :** Install Express as Main Dependency since we will need it in production as well

```
npm install express
```

- **Step-4 :** Install Ts globally

```
npm install -g typescript
```

- **Step-5 :** Bring the Typescript Config File

```
 tsc --init
```

- **Step-6 :** Set the Ts and js file directory in tsconfig.json file

```json
"rootDir": "./src/"
"outDir": "./dist/"
```

- **Step-7 :** Create Folders and files. all application related file will be in application folder. Server file will handle the server related tasks and app related tasks will be in app.ts. server.ts and app.ts are the entry point like index.js we have separated the files. app.ts is the entry point of application and server.ts is the entry point of server.

![alt text](image.png)

- **Step-8 :** Build The App

```ts
import express, { Application, Request, Response } from "express";

const app: Application = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Dunia !");
});

app.listen(port, () => {
  console.log(`Example App Listening On Port ${port}`);
});
```

![alt text](image-1.png)

- **Step-9 :** As we are using typescript with express, we have to install the type declaration file for express. Express is giving some properties and functions. They have all of these and they have created type declaration file as same as we create type for our functions variables etc. we have to install this type declaration file. This file keeps all the types for us.

```
npm i --save-dev @types/express
```

- **Step-10 :** Lets Compile This File to js file

```
tsc
```

- **Step-11 :** Now Lets Run The Compiled File

```
node ./dist/app/app.js
```

- **Step-12 :** Move the Server related works in server file

```ts
import app from "./app";

let server;
const port = 5000;

const bootstrap = async () => {
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
```

- **Step-11 :** Run the Server File

```
node ./dist/app/server.js
```

#### Final Files

- app.ts

```ts
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
```

- server.ts

```ts
import app from "./app";

let server;
const port = 5000;

const bootstrap = async () => {
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
```

-
- server **open, close, server error handling** and other works will be done in server file
- All the **routing related works and handling middleware and route related error handling** will be done in app file.
- **Crud Operation and database related** works will be in app folder.

## 14-3 What is parsers, request and response object

- **Step-12 :** Add a watcher for the typescript file which will watch all the time for the changes of typescript. If any changes found it automatically transpile the ts file to js file. now split the terminal and run the server again
- The req (request) and res (response) are the exact same objects that Node provides,

```
tsc -w
```

![alt text](image-2.png)

- **Step-13 :** For Restarting The server automatically we have to use nodemon package. Nodemon watches the js file changes. if any changes is happening it restarts the server.

[Nodemon](https://www.npmjs.com/package/nodemon)

```
npm install -d nodemon
```

- **Step-14 :** Install The Nodemon Globally

```
npm install -g nodemon
```

- **Step-15 :** Run The Nodemon

```
 nodemon ./dist/app/server.js
```

- **Step-15 :** We can Write a script for the nodemon so that we do not have to write the command

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "nodemon ./dist/app/server.js"
  },
```

-
- **Step-16 :** Run the Server using this command

```
npm run dev
```

- If we send json data inside a body we have to parse the data. express gives us some parser. we are sending json data, express wont understand the data needs to be parsed. there is need need to manually do parsing json data. This is builtin middleware function. This takes the data inside the body and parse them to convert in object.

[Express Json parser](https://expressjs.com/en/5x/api.html#express.json)

```js
app.use(express.json());
```

- As this json parser is a middleware function. we have to use this using `app.use()`

- there are also some more middleware. some of them are working as a parser.

![alt text](image-3.png)

- Express is entirely runs on middleware. express functions are connected to each other and each function is a middleware.

```ts
import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();
app.use(express.json());

const filePath = path.join(__dirname, "../../db/todos.json");

// console.log(filePath);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos App!");
});
app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;

  res.json("Created");
});

export default app;
```

## 14-4 What is Params & Queries

- We can query data in two different way.

```
https://jsonplaceholder.typicode.com/posts?userId=1
```

```
https://jsonplaceholder.typicode.com/posts/6
```

#### We can find object using query parameter

```
http://localhost:5000/todos?title=Morning&body=Node.js
```

- we can find this using req.query

```js
req.query;
```

![alt text](image-4.png)

#### We can find object using Dynamic Id

```
http://localhost:5000/todos/Morning
```

- we have to receive inside the param for this

```js
app.get("/todos/:title", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(req.params);
  res.json(data);
});
```

![alt text](image-5.png)

- we can merge them both

```
http://localhost:5000/todos/morning?body=Node.js
```

```js
app.get("/todos/:title", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From Params", req.params);
  console.log("From Query", req.query);
  res.json(data);
});
```

- we can add multiple query with this.

```
http://localhost:5000/todos/morning?title=sazid&body=Node.js
```

- lets see multi dynamic route

```
http://localhost:5000/todos/morning/Node.js?title=sazid&body=Node.js
```

```js
app.get("/todos/:title/:body", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From Params", req.params);
  console.log("From Query", req.query);
  res.json(data);
});
```

## 14-5 Routing In Express

- Express gave us a middleware for routing.
- we will separate each service into different parts.And to do this we have to use express `Router Middleware`

```js
const todosRouter = express.Router();
```

- here this just a child of the app.
- we can do get, post, put, delete etc with it. Its a minimal app itself. allows like `todosRouter.get()`
- when anyone wants to work with todos app will tell us that bro you go to todosRouter app.
- Js works like it does the works line by line from top to bottom.

#### Lets see how to create a route and how it works.

1. `const todosRouter = express.Router();` Creating the todosRouter.
2. `app.use("/todos", todosRouter); ` telling app to direct the request to todosRouter when "/todos" request is found.

```ts
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

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos App!");
});

todosRouter.get("/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.json({
    message: "All Todos From Todos Router",
    data,
  });
});

export default app;
```

- [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]

- Here App is the main driver compartment or engine. and others are the compartments set one by one.
- Fist the compartments will be set one by one and then if "/todos" request comes app will check where to go and which compartment will do the work, as we have defined that if any "/todos" related works are coming we have to use todoRouter, app will one by one check and jump from one to another and will look for [todosRouter]. when its fount app will enter there and do the operation.

- [todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
- As todosRouter work is found app hands over the works to [todosRouter] and then this does the works matching inside starting same as app.

## 14-6 Organizing Codes and Splitting The Routes

- Lets split the works based no the services.

- todos.routes.ts

```ts
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

todosRouter.get(":/title", (req: Request, res: Response) => {
  res.json("");
});

todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  res.json("");
});

todosRouter.delete("delete-todo/:title", (req: Request, res: Response) => {
  res.json("");
});
```

- app.ts

```ts
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
```

## 14-7 Connecting MongoDB to express

sazid-mongo

- lets Integrate Mongodb

- **Step-1 :** Install MongoDB

```
npm install mongodb
```

-
- **Step-2 :** Create a Mongodb Ui in server.ts

```js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://sazid-mongo:sazid-mongo@cluster0.cjbmdks.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
```

![alt text](image-6.png)

- this how we set the database name.

- **Step-3 :** Lets Connect the client Now

```ts
const bootstrap = async () => {
  await client.connect(); // used this to connect
  console.log("Connected To Mongodb");
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
```

- now lets test connecting the db and insert one data

```js
import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";

let server;
const port = 5000;

const uri =
  "mongodb+srv://sazid-mongo:sazid-mongo@cluster0.cjbmdks.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  await client.connect();
  console.log("Connected To Mongodb");

  // testing_____________________________________
  const db = await client.db("todosDB");
  // console.log(db);
  const collection = await db.collection("todos").insertOne({
    title: "MongoDB",
    body: "Wow Level Mongodb",
  });
  // console.log(collection);
  // _____________________________________________testing
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
```

- What will do the operation inside in the separated files not in the server file.
