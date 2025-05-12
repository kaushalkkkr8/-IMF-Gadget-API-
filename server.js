import { connection } from './db.js';
import app from './index.js'
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;


connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
  });