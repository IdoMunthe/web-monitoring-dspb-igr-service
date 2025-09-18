import { Router } from "express";
import { getLogNpb } from "../controllers/logNpb.controller";
import { getTokoListController } from "../controllers/tokoList.controller";
import axios from "axios";
import { getCabangConnectionController } from "../controllers/cabangConnection.controller";
import { query } from "../db";
import { loginController } from "../controllers/login.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.get("/log-npb", authMiddleware, getLogNpb);
router.get("/toko-list", authMiddleware, getTokoListController);
router.get("/cabang-list", authMiddleware, getCabangConnectionController)

router.get("/branch-list", async (req, res) => {
  try {
    const response = await axios.get(
      "http://fo.indogrosir.lan/oraws/oraclewebservice.asmx/GetBranchList"
    );
    res.send(response.data); // forward the result
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching branch list");
  }
});

router.get("/test-igrmktho", async (req, res) => {
  try {
    const rows = await query("SELECT SYSDATE FROM dual"); // Oracle’s test query
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB query failed" });
  }
});

router.post("/login", loginController)

export default router;
