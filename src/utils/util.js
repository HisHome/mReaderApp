
const util = {
    getQuery: function () {
        let queryStr = window.location.search.substring(1, window.location.search.length);
        let query = {};
        let array1 = queryStr ? queryStr.split('&') : [];
        array1.map(function (item, index) {
            if (query.hasOwnProperty(item.split('=')[0])) {
                query[item.split('=')[0]] instanceof Array
                    ? query[item.split('=')[0]].push(decodeURIComponent(item.split('=')[1]))
                    : query[item.split('=')[0]] = [query[item.split('=')[0]], decodeURIComponent(item.split('=')[1])]
            } else {
                query[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
            }
        });
        return query;
    },
    initQuery: function(object){
        let str = ''
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (str){
                    str += '&' + key +'='+ object[key];
                } else {
                    str += key +'='+ object[key];
                }
            }
        }
        if (str){
            str = '?' + str 
        }
        return str;
    },
    initNum:function(num){
        let str = 0
        if (num){
            if(num > 10000){
                str = (num / 10000).toFixed(1) + '万'
            } else {
                str = num
            }
        }
        return str
    },
    initContent: function(str){
        let arr = []
        if (str){
            arr = str.split('\n')
          
        }
        return arr
    },
    getDetailBackUrl:function(val){
        if (!val) return;
        return [
            '',
            '/bookTypeInfo',
            '/bookRankInfo'
        ][val]
    }
}

export default util;