import { Request, Response } from "express";
import { getCabangConnectionService } from "../services/cabangConnection.service";

export const getCabangConnectionController = async (req: Request, res: Response) => {
  try {
    const data = await getCabangConnectionService()
    res.status(200).json({success: true, data})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}