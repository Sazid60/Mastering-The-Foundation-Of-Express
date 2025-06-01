import app from "./app";
import { client } from "../config/mongodb";

let server;
const port = 5000;

const bootstrap = async () => {
  await client.connect();
  console.log("Connected To Mongodb");
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
