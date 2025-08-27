import { getDb } from "../db";
import { getTokoDefaultQuery } from "../queries/tokoList.query";

export const getTokoListService = async (kodeCabang: string) => {
  const db = await getDb(kodeCabang)
  const result = await db.query(getTokoDefaultQuery, [kodeCabang]);
  return result.rows;
};
