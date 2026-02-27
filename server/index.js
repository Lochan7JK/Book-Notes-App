import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; //to allow dynamic port assignment
app.use(cors());
app.use(express.json()); // IMPORTANT
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
