import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookContent',
    state: {
        bookSource: {},
        bookContent: {}
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
            console.log('=====1111====');
            console.log(data);
            
            yield put({ type: 'bookSource', data: data.data || {} });
            const data2 = yield call(zhui.getBookChapter, {sourceId: data.data[0]._id, view: 'chapters'});
            console.log('=====2222====');
            console.log(data2);
            const data3 = yield call(zhui.getBookChapterContent, {chapterLink: data2.data.chapters[0].link});
            console.log('=====3333====');
            console.log(data3);
            yield put({ type: 'bookContent', data: data3.data || {} });
        },
    },
    reducers: {
        bookSource(state, {data}) {
            return { ...state, bookSource: data };
        },
        bookContent(state, {data}) {
            return { ...state, bookContent: data };
        },
    },
};
