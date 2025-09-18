import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { initPool } from "./db";

dotenv.config();

async function bootstrap() {
  await initPool(); // wait until Oracle pool is ready

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", router);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server's up. Check at http://localhost:${PORT}`);
  });
}

bootstrap();
