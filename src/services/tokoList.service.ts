import { db } from "../db";
import {
  getTokoDefaultQuery,
} from "../queries/tokoList.query";

const getKodeIGR = async () => {
  const res = await db.query("SELECT prs_kodeigr FROM TBMASTER_PERUSAHAAN");
  const kodeIGR = res.rows[0].prs_kodeigr;
  console.log(kodeIGR);
  return kodeIGR;
};

export const getTokoListService = async () => {
  const kodeIGR = await getKodeIGR();
  const sql = getTokoDefaultQuery();
  const result = await db.query(sql, [kodeIGR]);
  return result.rows;
};
