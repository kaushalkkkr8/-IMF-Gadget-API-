import express from "express";
import dotenv from "dotenv";
import gadgetRoutes from "./routes/gadgetRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/gadgets", gadgetRoutes);
app.use("/auth", authRoutes);


export default app