import { getDb } from "../db";

export const loginService = async (
  branch: string,
  username: string,
  password: string
) => {
  const db = await getDb(branch as string);
  const result = await db.query(`select * from tbmaster_user where userid= '${username}' and userpassword = '${password}';`);
  return result.rows[0] || null
};
