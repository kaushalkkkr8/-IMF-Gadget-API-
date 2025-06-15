import express from "express";
import dotenv from "dotenv";
import gadgetRoutes from "./routes/gadgetRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use("/gadgets", gadgetRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ IMF Gadget API is live!");
});

export default app;
