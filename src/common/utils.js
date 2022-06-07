export function debounce(fun, delay) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer)
        } else {
            timer = function(...args) {
                setTimeout(() => {
                    fun.apply(this, args)
                }, delay);
            }
        }
    }
}