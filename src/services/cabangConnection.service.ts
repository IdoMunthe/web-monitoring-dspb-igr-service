import { igrmktho } from "../db";
import { getCabangList } from "../queries/cabangConnection.query";

export const getCabangConnectionService = async () => {
  const queryResult = await igrmktho.query(getCabangList);
  return { listCabang: queryResult };
};
