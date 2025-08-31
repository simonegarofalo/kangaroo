import express from "express";
import contentsRouter from "./api/contents.js";

const app = express();

app.use(express.json());
app.use("/api/contents", contentsRouter);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});