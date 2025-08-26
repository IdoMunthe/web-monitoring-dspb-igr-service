export const getTokoDefaultQuery = () => {
  return `select TKO_KODEOMI from  tbmaster_tokoigr where TKO_KODEIGR = $1 and TKO_KODESBU = 'I'`;
};
