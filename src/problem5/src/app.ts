import express from "express";
import itemRoutes from "./routes/itemRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/items", itemRoutes);
app.use(errorHandler);
export default app;
