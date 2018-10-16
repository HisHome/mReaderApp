import request from '../utils/request';

export function getBookType(data) {
    return request('/zhuishushenqi/cats/lv2/statistics', data);
}
export function getBookTypeInfo(data) {
    return request('/zhuishushenqi/book/by-categories', data);
}
export function getBookTypeLv2(data) {
    return request('/zhuishushenqi/cats/lv2', data);
}
