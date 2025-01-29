import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth/user.auth.js";
import timeout from "connect-timeout";
import { connectDB } from "./db/db.connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message/user.message.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3008;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" , credentials : true }));



app.use(timeout("1m"));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.use("/api/auth", authRouter);
app.use("/api/message" , messageRouter);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
  connectDB();
});
