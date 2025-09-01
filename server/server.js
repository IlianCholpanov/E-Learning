import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import coursesRoutes from "./routes/coursesRouter.js";
config();

const { MONGODB_CONNECTION_STRING, SERVER_PORT } = process.env;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const app = express();

app.use(cors());
app.use(json());

app.use("/courses", coursesRoutes);

connect(MONGODB_CONNECTION_STRING, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(SERVER_PORT || 3000, () => {
      console.log(`Server running...`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
