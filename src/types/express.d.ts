// types/express.d.ts
import { JwtPayload } from "../middleware/auth.middleware"; // import your type

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
