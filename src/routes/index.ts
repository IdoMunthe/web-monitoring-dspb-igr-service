import { Router } from "express";
// import { getLogNpb } from "../controllers/logNpb.controller";
import { getTokoListController } from "../controllers/tokoList.controller";
import axios from "axios";

const router: Router = Router();

// router.get("/log-npb", getLogNpb);
router.get("/toko-list", getTokoListController);

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

export default router;
