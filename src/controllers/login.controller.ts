import { Request, Response } from "express";
import { loginService } from "../services/login.service";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const loginController = async (req: Request, res: Response) => {
  try {
    const { branch, username, password } = req.body;

    if (!branch || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing branch or username or password",
      });
    }

    const user = await loginService(
      branch as string,
      username as string,
      password as string
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username Atau Password Salah"
      })
    }

    const payload = {
      userId: user.userid,
      branch
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "12h"})

    return res.status(200).json({
      success: true,
      token,
      user: {userid: user.userid, branch: user.kodeigr}
    })
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
