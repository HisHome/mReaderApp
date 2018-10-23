import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookContent',
    state: {
        bookSource: {},
        bookContent: {},
        bookCapterList: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                console.log(pathname)
                if (pathname === '/bookContent') {
                    dispatch({
                        type: 'getBookSource',
                        payload: {
                            ...util.getQuery(),
                            view: 'summary'
                        }
                    })
                }
            });
        },
    },
    effects: {
        *getBookSource({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookSource, payload);
            yield put({ type: 'bookSource', data: data.data || {} });
            const data2 = yield call(zhui.getBookChapter, {sourceId: data.data[0]._id, view: 'chapters'});
            yield put({ type: 'bookCapterList', data: data2.data.chapters || [] });
            yield put({ type: 'bookContent', payload: {chapterLink: data2.data.chapters[0].link} });
        },
        *bookContent({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookChapterContent, payload);
            yield put({ type: 'upDateBookContent', data: data.data || {} });
        },

    },
    reducers: {
        bookSource(state, {data}) {
            return { ...state, bookSource: data };
        },
        upDateBookContent(state, {data}) {
            return { ...state, bookContent: data };
        },
        bookCapterList(state, {data}) {
            return { ...state, bookCapterList: data };
        },
    },
};
