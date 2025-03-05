/**
 * javascript -
 * Object.getPrototypeOf(value).toString()  会得到js 以下的数据类型
 * @param * string
 */
export const argsTag = "[object Arguments]",
    undefinedTag ="[object Undefined]",
    arrayTag = "[object Array]",
    asyncTag = "[object AsyncFunction]",
    boolTag = "[object Boolean]",
    dateTag = "[object Date]",
    domExcTag = "[object DOMException]",
    errorTag = "[object Error]",
    funcTag = "[object Function]",
    genTag = "[object GeneratorFunction]",
    mapTag = "[object Map]",
    numberTag = "[object Number]",
    nullTag = "[object Null]",
    objectTag = "[object Object]",
    promiseTag = "[object Promise]",
    proxyTag = "[object Proxy]",
    regexpTag = "[object RegExp]",
    setTag = "[object Set]",
    stringTag = "[object String]",
    symbolTag = "[object Symbol]",
    weakMapTag = "[object WeakMap]",
    weakSetTag = "[object WeakSet]";


// @ts-ignore
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;


export  default  {
    argsTag,
    undefinedTag,
    arrayTag,
    asyncTag,
    boolTag,
    dateTag,
    domExcTag,
    errorTag,
    funcTag,
    genTag,
    mapTag,
    numberTag,
    nullTag,
    objectTag,
    promiseTag,
    proxyTag,
    regexpTag,
    setTag,
    stringTag,
    symbolTag,
    weakMapTag,
    weakSetTag,
    symToStringTag
}
