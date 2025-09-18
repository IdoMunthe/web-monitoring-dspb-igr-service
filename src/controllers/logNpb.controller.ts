import { Request, Response } from "express";
import { getLogNpbByDate } from "../services/logNpb.service";
import { AuthRequest } from "../types/authRequest";

export const getLogNpb = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, jenisNpb, statusKirim, kodeToko} = req.query;
    const branch = req.user?.branch

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate (format: DD-MM-YYYY), jenisNpb, statusKirim, kodeToko, branch are required",
      });
    }

    const data = await getLogNpbByDate(
      startDate as string,
      endDate as string,
      jenisNpb as string,
      statusKirim as string,
      kodeToko as string,
      branch as string
    );
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("Error fetching log_npb:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
