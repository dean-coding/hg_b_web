
// (new Date(),"yyyy-MM-dd hh:mm:ss")
export function formatDate(date, fmt) {
    if(!fmt) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    } 
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    console.log(fmt);
    return fmt
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

/**
 * 过滤商品步骤状态
 * @param {*} status 
 */
export function formatGooItemSteps(status) {
    switch (status) {
        case 'DEVELOPING':
            return '设计中'
            break;
        case 'UP_SHELF':
            return '已上架'
            break;
        case 'DOWN_SHELF':
            return '已下架'
            break;
        default:
            break;
    }
}