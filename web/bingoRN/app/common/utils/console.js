//Rewrite js console
console.log = (function (logFunc) {
    return function () {
        // If it is not debug
        if (!__DEV__) return
        try {
            let arr = []
            arr.push(...arguments)
            arr.forEach((item, index) => {
                if (Object.prototype.toString.call(item) === '[object Object]' ||
                    Object.prototype.toString.call(item) === '[object Array]') {
                    arr[index] = JSON.parse(JSON.stringify(item))
                }
            })
            logFunc.call(console, ...arr)
        } catch (e) {
            console.log(`a log error: ${e}`)
        }
    }
})(console.log)