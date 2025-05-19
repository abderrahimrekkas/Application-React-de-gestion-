// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connectDB } from "./config/connectDB.js";
// import authRouter from "./routes/authRouter.js";
// import path from "path";

// dotenv.config();

// const server=express();
// const port=process.env.PORT || 8083;
// const __dirname=path.resolve();

// server.use(cors({origin: "http://localhost:5174", credentials: true}));

// server.use(express.json());
// server.use(cookieParser());

// // server.get("/", (req, res)=> {
// //     res.send("Welcome to the server");
// // });

// server.use("/api/auth", authRouter);

// if(process.env.NODE_ENV==="production"){
//     server.use(express.static(path.join(__dirname, "/frontend/dist")));

//     server.get("*", (req, res)=> {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }

// server.listen(port, ()=> {
//     connectDB();
//     console.log("Server running at port", port);
// });
console.log("Server running at port", port);