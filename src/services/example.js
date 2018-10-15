import request from '../utils/request';

export function getBookType() {
  return request('/api/users');
}
