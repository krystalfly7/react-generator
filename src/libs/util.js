export const getUrlParamByName = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const location = window.location.search === '' ? window.location.hash : window.location.search;
  const param = location.split('?');
  const r = param.length > 1 ? param[1].match(reg) : param[0].match(reg);
  if (r != null) return unescape(decodeURIComponent(r[2]));
  return null;
};
