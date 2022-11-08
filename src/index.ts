import "./loadEnvironment.js";
import connectDatabase from "./database/index.js";
import startServer from "./server/index.js";

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

// eslint-disable-next-line no-implicit-coercion
await startServer(+port);
await connectDatabase(url);
