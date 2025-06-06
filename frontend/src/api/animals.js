const BASE_URL = 'http://localhost:4000/api';

// 1. 유기동물 목록 조회
export const fetchAnimalList = async (
  page = 1,
  numOfRows = 10,
  bgnde = '',
  endde = '',
  upr_cd = '',
  org_cd = '',
  upkind = '',
  kind = '',
  sexCd = ''
) => {
  const res = await axios.get(`${BASE_URL}/animals`, {
    params: {
      pageNo: page,
      numOfRows,
      bgnde,
      endde,
      upr_cd,
      org_cd,
      upkind,
      kind,
      sexCd,
    },
  });
  return res.data.response.body.items.item || [];
};
