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
  server = app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`);
  });
};

bootstrap();
