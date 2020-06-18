//Rewrite js console
console.log = (function (logFunc) {
    return function () {
        // If it is not debug
        if (!__DEV__) return
        try {
            logFunc.call(console, ...arguments)
        } catch (e) {
            console.log(`a log error: ${e}`)
        }
    }
})(console.log)