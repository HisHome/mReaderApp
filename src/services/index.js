import request from '../utils/request';

// 获取带书籍数量的父分类
export function getBookType(data) {
    return request('/zhuishushenqi/cats/lv2/statistics', data);
}
// 获取分类书籍
export function getBookTypeInfo(data) {
    return request('/zhuishushenqi/book/by-categories', data);
}
// 带子分类的父分类
export function getBookTypeLv2(data) {
    return request('/zhuishushenqi/cats/lv2', data);
}
// 获取小说详情
// http://api.zhuishushenqi.com/book/:id
export function getBookDetail(data) {
    return request(`/zhuishushenqi/book/${data.book}`, data);
}

// 获取小说短评
export function getBookShortReview(data) {
    return request(`/zhuishushenqi/post/short-review`, data);
}

// 获取小说评论
export function getBookReview(data) {
    return request(`/zhuishushenqi/post/review/by-book`, data);
}
