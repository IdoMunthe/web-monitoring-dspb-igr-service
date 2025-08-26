import { Request, Response } from "express";
import { getTokoListService } from "../services/tokoList.service";

export const getTokoListController = async (req: Request, res: Response) => {
  try {
    const data = await getTokoListService();
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
