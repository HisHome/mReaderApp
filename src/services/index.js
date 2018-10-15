import request from '../utils/request';

export function getBookType(data) {
  return request('/zhuishushenqi/cats/lv2/statistics', data);
}
