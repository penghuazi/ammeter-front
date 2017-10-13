/**
 * @description 日期时间相关过滤器.
 * @author Mr.ZHAO
 */

// YYYY-MM-DD
exports.todate = {
    read: val => {
        if (val == null || val == '')
            return '';
        var time = new Date(val);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        return y + '-' + add0(m) + '-' + add0(d);
    }
}

// YYYY-MM-DD HH:MI:SS
exports.todatetime = {
    read: val => {
        if (val == null || val == '')
            return '';

        var time = new Date(val);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();

        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }
}
