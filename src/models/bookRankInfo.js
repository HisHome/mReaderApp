import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookRankInfo',
    state: {
        bookRankInfo: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                if (pathname === '/bookRankInfo') {
                    dispatch({ type: 'getBookRanking',payload: util.getQuery() })
                }
            });
        },
    },

    effects: {
        *getBookRanking({ payload }, { call, put }) { 
            yield put({ type: 'updateBookRankInfo', data: {} });
            if (!payload || !payload.id) return;
            const data = yield call(zhui.getBookRankInfo, payload);
            yield put({ type: 'updateBookRankInfo', data: data.data || {} });
        },
    },

    reducers: {
        updateBookRankInfo(state, {data}) {
            return { ...state, bookRankInfo: data };
        },
        clearBookRankInfo(state, {data}) {
            return { ...state, bookRankInfo: {} };
        },
    },

};
