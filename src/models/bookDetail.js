import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookDetail',
    state: {
        bookDetail: {},
        bookReview: []
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                console.log(pathname)
                if (pathname === '/bookDetail') {
                    dispatch({
                        type: 'getBookDetail',
                        payload: util.getQuery()
                    })
                    dispatch({
                        type: 'getBookReview',
                        payload: {
                            ...util.getQuery(),
                            sort: 'updated',
                            start: 0,
                            limit: 3,
                        }
                    })
                }
            });
        },
    },
    effects: {
        *getBookDetail({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookDetail, payload);
            yield put({ type: 'bookDetail', data: data.data || {} });
        },
        *getBookShortReview({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookShortReview, payload);
            console.log('-------')
            console.log(data)
        },
        *getBookReview({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookReview, payload);
            console.log('==========')
            console.log(data)
            yield put({ type: 'bookReview', data: data.data ? data.data.reviews : [] });
        },
    },
    reducers: {
        bookDetail(state, {data}) {
            return { ...state, bookDetail: data };
        },
        bookReview(state, {data}) {
            return { ...state, bookReview: data };
        },
    },
};
