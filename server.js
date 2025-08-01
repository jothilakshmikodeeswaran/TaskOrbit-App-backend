import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import cors from "cors";
import usersRouter from "./routes/usersRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";
import tasksRouter from "./routes/tasksRoutes.js";
import employesRoutes from "./routes/employesRoutes.js"
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const PROD_URL = process.env.PROD_URL;

// // 1
// const whitelist = ["http://localhost:3000", PROD_URL];
// // 2
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// 3

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter); 
app.use("/api/employees", employesRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "temp")));

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
