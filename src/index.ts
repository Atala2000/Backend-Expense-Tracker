import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import session from 'express-session';
import router from './routes/routes';
import process from "process";
import MongoStore from "connect-mongo";

dotenv.config();


const app = express();


app.use(session({
  secret: process.env.SECRET_KEY as string,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: 'mongodb://127.0.0.1:27017/session-store'  
  }),
  cookie: {
    secure: false,
    sameSite: 'strict'
  }
}))
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", router);
app.get("/test", (req: Request, res: Response) => {
  return res.send("Server works");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
