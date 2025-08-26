export const GET_LOG_NPB_BY_DATE = `
  SELECT 
    npb_tgl_proses AS tgl_proses,
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
  AND npb_jenis = $3
  AND npb_response = $4
  AND npb_kodetoko = $5
`;
