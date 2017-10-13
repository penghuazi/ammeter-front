/**
 * @author: pkeros.
 * @date: 2016/5/24.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

export default {
    write: function(val, oldVal) {
        return val.replace(/(^\s*)|(\s*$)/g,'')
    }
}

