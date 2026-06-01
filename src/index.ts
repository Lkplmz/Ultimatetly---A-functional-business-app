import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 5000;

import apiRouteHandler from "./routes/api/handler";
import authRouteHandler from "./routes/auth/handler";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api", apiRouteHandler);
app.use("/auth", authRouteHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
