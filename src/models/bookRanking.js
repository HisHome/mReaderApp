import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookRanking',
    state: {
        bookRanking: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                if (pathname === '/bookRanking') {
                    dispatch({ type: 'getBookRanking' })
                }
            });
        },
    },

    effects: {
        *getBookRanking({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.rankingGender, payload);
            yield put({ type: 'updateBookRanking', data: data.data || {} });
        },
    },

    reducers: {
        updateBookRanking(state, {data}) {
            return { ...state, bookRanking: data };
        },
    },

};
