export const getCabangList = `
select cab_kodecabang, cab_namacabang from tbmaster_cabang
where cab_namacabang not like '%SPI%' and
cab_namacabang not like '%ICM%'
order by cab_kodecabang asc
`