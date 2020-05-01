// utilities
function isObject(target: unknown) {
    return Object.prototype.toString.call(target) === '[object Object]'
}

function isArray(target: unknown) {
    return Object.prototype.toString.call(target) === '[object Array]'
}

function isDate(target: unknown) {
    return Object.prototype.toString.call(target) === '[object Date]'
}

function isRegExp(target: unknown) {
    return Object.prototype.toString.call(target) === '[object RegExp]'
}

/**
 * DeepClone 算法
 */
export function clone(source: any): any {
    if (typeof source === 'function') throw new TypeError('source should not be a function.')

    if (!isObject(source)) { // 如果是 number/string/boolean/null/undefined 的话，直接返回就好
        return source
    }

    const target: any = {}

    for (const i in source) {
        if (source.hasOwnProperty(i)) {
            if (isDate(source[i])) {
                target[i] = new Date(source[i].getTime())
            } else if (isRegExp(source[i])) {
                const flags = []
                if (source[i].global) {
                    flags.push('g')
                }
                if (source[i].ignoreCase) {
                    flags.push('i')
                }
                if (source[i].multiline) {
                    flags.push('m')
                }
                target[i] = new RegExp(source[i].source, flags.join(''))
            } else if (isArray(source[i])) {
                target[i] = source[i].map((j: any) => clone(j))
            } else if (isObject(source[i])) {
                target[i] = clone(source[i])
            } else {
                target[i] = source[i]
            }
        }
    }

    return target
}
