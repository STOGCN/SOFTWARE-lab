import express from "express";
import userRoutes from "./UserRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
