import express from "express";
import dotenv from "dotenv";
import gadgetRoutes from "./routes/gadgetRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/gadgets", gadgetRoutes);


export default app