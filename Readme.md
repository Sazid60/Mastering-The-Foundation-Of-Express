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

- server **open, close, server error handling** and other works will be done in server file
- All the **routing related works and handling middleware and route related error handling** will be done in app file.
- **Crud Operation and database related** works will be in app folder.
