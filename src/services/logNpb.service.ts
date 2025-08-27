import { getDb } from "../db";

export const getLogNpbByDate = async (
  startDate: string,
  endDate: string,
  jenisNpb: string,
  statusKirim: string,
  kodeToko: string,
  kodeCabang: string
) => {
  let query = `
    SELECT npb_tgl_proses AS tgl_proses,
    npb_kodetoko AS kode_toko,
    npb_nopb AS no_pb,
    npb_tglpb AS tgl_pb,
    npb_nodspb AS no_dspb,
    npb_file AS filename,
    npb_jenis AS jenis_npb,
    npb_url AS url_npb,
    npb_response AS response,
    npb_jml_retry AS jml_push_ulang
    FROM log_npb
    WHERE DATE(npb_tgl_proses) BETWEEN TO_DATE($1,'DD-MM-YYYY') AND TO_DATE($2,'DD-MM-YYYY')
  `;
  const params: any[] = [startDate, endDate];
  let idx = 3;

  if (jenisNpb && jenisNpb !== "All") {
    query += ` AND npb_jenis = $${idx++}`;
    params.push(jenisNpb);
  }

  if (statusKirim && statusKirim !== "All") {
    query += ` AND npb_response LIKE $${idx++}`; // use LIKE for partial match
    params.push(`%${statusKirim}%`); // add % for substring search
  }

  if (kodeToko && kodeToko !== "All") {
    query += ` AND npb_kodetoko = $${idx++}`;
    params.push(kodeToko);
  }

  const db = await getDb(kodeCabang);

  const result = await db.query(query, params);
  return result.rows;
};
