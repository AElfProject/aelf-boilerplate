//Rewrite js console
console.log = (function (logFunc) {
    return function () {
        // If it is not debug
        if (!__DEV__) return
        try {
            let arr = []
            arr.push(...arguments)
            arr.map(item => {
                if (!item.children && Object.prototype.toString.call(item) === '[object Object]' ||
                    Object.prototype.toString.call(item) === '[object Array]') {
                    item.parent = JSON.parse(JSON.stringify(item))
                }
                return item
            })
            logFunc.call(console, ...arr)
        } catch (e) {
            console.log(`a log error: ${e}`)
        }
    }
})(console.log)