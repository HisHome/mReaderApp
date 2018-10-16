import * as zhui from '../services/index.js';
import util from '../utils/util';

export default {
    namespace: 'bookTypeInfo',
    state: {
        bookTypeInfo: {},
        bookSearchList:[
            {name: '热门', value: 'hot'},
            {name: '新书', value: 'new'},
            {name: '好评', value: 'reputation'},
            {name: '完结', value: 'over'},
            {name: '包月', value: 'monthly'}
        ],
        bookMinor: ['晓说2','小说1']
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                console.log(pathname)
                if (pathname === '/bookTypeInfo') {
                    dispatch({
                        type: 'getBookTypeInfo',
                        payload: util.getQuery()
                    })
                    dispatch({
                        type: 'getBookTypeLv2',
                        payload: util.getQuery()
                    })
                }
            });
        },
    },

    effects: {
        *getBookTypeInfo({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(zhui.getBookTypeInfo, payload);
            yield put({ type: 'bookTypeInfo', data: data.data || {} });
        },
        *getBookTypeLv2({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(zhui.getBookTypeLv2, payload);
            let arr = data.data[util.getQuery().gender]
            let arr2 = []
            if (arr){
                arr.forEach(element => {
                    if (element.major == util.getQuery().major){
                        arr2 = element.mins
                    }
                });
                if (arr2.length){
                    arr2.unshift('')
                }
            }
            yield put({ type: 'bookMinor', data: arr2 });
        },
    },

    reducers: {
        bookTypeInfo(state, {data}) {
            return { ...state, bookTypeInfo: data };
        },
        bookMinor(state, {data}) {
            return { ...state, bookMinor: data };
        },
    },

};
