import { Request, Response } from "express";
import { getTokoListService } from "../services/tokoList.service";
import { AuthRequest } from "../types/authRequest";

export const getTokoListController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const branch = req.user?.branch; // branch = "01" or "03" etc.
    const branchFromQuery = req.query.branch

    if (branchFromQuery && branchFromQuery !== branch) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: cannot access another branch"
      })
    }
    
    if (!branch) {
      return res
        .status(400)
        .json({ success: false, message: "Cabang is required" });
    }

    const data = await getTokoListService(branch as string);

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
