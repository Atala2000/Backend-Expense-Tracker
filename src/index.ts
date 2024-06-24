import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", router);
app.get("/test", (req: Request, res: Response) => {
  return res.send("Servier works");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
