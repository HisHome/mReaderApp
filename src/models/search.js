import * as zhui from '../services/index.js';
import util from '../utils/util.js';

export default {
    namespace: 'search',
    state: {
        searchBook: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {  
            return history.listen(({ pathname }) => {
                if (pathname === '/search') {
                    dispatch({
                        type: 'getSearchBook',
                        payload: util.getQuery()
                    })
                }
            });
        },
    },

    effects: {
        *getSearchBook({ payload }, { call, put }) { 
            yield put({ type: 'bookList', data: {} });
            const data = yield call(zhui.getSearchBook, payload);
            yield put({ type: 'bookList', data: data.data || {} });
        },
    },

    reducers: {
        bookList(state, {data}) {
            return { ...state, searchBook: data };
        },
    },

};
