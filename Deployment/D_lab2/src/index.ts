import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// สร้าง route พื้นฐาน
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// เริ่ม server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
