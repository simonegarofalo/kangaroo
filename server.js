import express from "express";
import contentsRouter from "./api/contents.js";

const app = express();

app.use(express.json());
app.use("/api/contents", contentsRouter);
app.use(express.static("public"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});