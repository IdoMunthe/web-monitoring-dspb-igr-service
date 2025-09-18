import { query } from "../db"
import { getCabangList } from "../queries/cabangConnection.query"

export const getCabangConnectionService = async () => {
  const queryResult = await query(getCabangList)
  return {listCabang: queryResult}
}