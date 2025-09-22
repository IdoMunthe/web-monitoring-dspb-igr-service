import { Pool } from "pg";
import dotenv from "dotenv";
import getConnectionDetails from "../lib/connection";
dotenv.config();

export async function getURL(cabang: string) {
  const connection = await getConnectionDetails(cabang);
  const url = `postgres://${connection?.ORA_USER}:${connection?.ORA_PWD}@${connection?.ORA_IP}:5432/${connection?.ORA_SERVICENAME}`;
  console.log(url);
  console.log("========================================");
  return url;
}

export async function getDb(cabang: string) {
  const url = await getURL(cabang);
  const db = new Pool({ connectionString: url });
  return db;
}

// export const igrmktho = new Pool({
//   user: 'igrmktho',
//   host: '172.20.28.24',
//   database: 'igrmktho',
//   password: 'igrmktho',
//   port: 1521,
// });

import oracledb from "oracledb";
oracledb.initOracleClient({
  libDir: "D:\\Private Folder\\ido\\instant-client\\instantclient_23_9",
});

let pool: oracledb.Pool;

export async function initPool() {
  if (!pool) {
    pool = await oracledb.createPool({
      user: "igrmktho",
      password: "igrmktho",
      connectString: "172.20.28.24:1521/igrmktho",
      poolMin: 1,
      poolMax: 10,
      poolIncrement: 1,
    });
    console.log("Oracle pool created");
  }
}

export async function query(sql: string, params: any[] = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
