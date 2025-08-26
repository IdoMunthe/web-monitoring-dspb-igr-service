import { Router } from "express";
import { getLogNpb } from "../controllers/logNpb.controller";
import { getTokoListController } from "../controllers/tokoList.controller";

const router: Router = Router();

router.get("/log-npb", getLogNpb);
router.get("/toko-list", getTokoListController);

export default router;
