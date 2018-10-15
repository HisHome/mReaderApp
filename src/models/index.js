import * as zhui from '../services/index.js';

export default {
    namespace: 'index',
    state: {
        bookTypeList: {}
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'getBookType',
                    })
                }
            });
        },
    },

    effects: {
        *getBookType({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookType, payload);
            yield put({ type: 'bookTypeList', data: data.data || {} });
        },
    },

    reducers: {
        bookTypeList(state, {data}) {
            return { ...state, bookTypeList: data };
        },
    },

};
