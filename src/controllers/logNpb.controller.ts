import { Request, Response } from "express";
import { getLogNpbByDate } from "../services/logNpb.service";

export const getLogNpb = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, jenisNpb, statusKirim, kodeToko } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required (format: DD-MM-YYYY)",
      });
    }

    const data = await getLogNpbByDate(
      startDate as string,
      endDate as string,
      jenisNpb as string,
      statusKirim as string,
      kodeToko as string
    );
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("Error fetching log_npb:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
