import express from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes/index.js";
import { authenticateToken } from "./middlewares/auth.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.middleware.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
// cors options
var corsOptions = {
  origin: process.env.URL_CLIENT_PRODUCTION || process.env.URL_CLIENT_DEV,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Use routes
app.use("/", router);
app.use(authenticateToken);
// Error handling middleware
app.use(errorHandlingMiddleware);

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
