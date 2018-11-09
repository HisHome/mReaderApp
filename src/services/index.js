import request from '../utils/request';

// 获取带书籍数量的父分类
export function getBookType(data) {
    return request('/zhuishuApi/cats/lv2/statistics', data);
}
// 获取分类书籍
export function getBookTypeInfo(data) {
    return request('/zhuishuApi/book/by-categories', data);
}
// 带子分类的父分类
export function getBookTypeLv2(data) {
    return request('/zhuishuApi/cats/lv2', data);
}
// 获取小说详情
// http://api.zhuishushenqi.com/book/:id
export function getBookDetail(data) {
    return request(`/zhuishuApi/book/${data.book}`, data);
}

// 获取小说短评
export function getBookShortReview(data) {
    return request(`/zhuishuApi/post/short-review`, data);
}

// 获取小说评论
export function getBookReview(data) {
    return request(`/zhuishuApi/post/review/by-book`, data);
}

// ---------------
// 书源
export function getBookSource(data) {
    return request(`/zhuishuApi/btoc`, data);
}
// 书籍章节
export function getBookChapter(data) {
    return request(`/zhuishuApi/btoc/${data.sourceId}`, data);
}
// 书籍章节内容
export function getBookChapterContent(data) {
    return request(`/zhuishuChapter/chapter/${data.chapterLink}`, data);
}
// 排名分类
export function rankingGender(data) {
    return request(`/zhuishuApi/ranking/gender`, data);
}
// 排名详情
export function getBookRankInfo(data) {
    return request(`/zhuishuApi/ranking/${data.id}`, data);
}