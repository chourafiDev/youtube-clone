import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import onError from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

//Connect to database
dbConnect();

app.use(cookieParser());
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
    verify: (req, res, buffer) => {
      req["rawBody"] = buffer;
    },
  })
);

//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);

//------deployment------
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}
//------deployment------

//Handle all error routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Error Middleware
app.use(onError);

app.listen(process.env.PORT, () => console.log("connect to server"));
