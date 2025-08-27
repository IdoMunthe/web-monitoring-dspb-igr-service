import { Pool } from "pg";
import dotenv from "dotenv";
import getConnectionDetails from "../lib/connection";
dotenv.config();

export async function getURL(cabang: string) {
  const connection = await getConnectionDetails(cabang);
  const url = `postgres://${connection?.ORA_USER}:${connection?.ORA_PWD}@${connection?.ORA_IP}:5432/${connection?.ORA_SERVICENAME}`;
  console.log(url)
  return url;
}

export async function getDb(cabang: string) {
  const url = await getURL(cabang);
  const db = new Pool({connectionString: url})
  return db
}


// export const db = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });
