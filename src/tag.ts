import {U} from "./index"


/**
 * javascript -
 * Object.getPrototypeOf(value).toString()  会得到js 以下的数据类型
 * @param * string
 */


export const INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e308,
    NAN = 0 / 0;


export const argsTag = "[object Arguments]",
    undefinedTag = "[object Undefined]",
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


import _ from "../src/index"


// @ts-ignore
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;


const arrayProto = Array.prototype;
const funcProto = Function.prototype;
const objectProto = Object.prototype;
const objectCreate = Object.create;

/**
 * @isPrototype
 * @param value any
 * @returns  boolean
 */


export const baseCreate = (function () {

    function object() {
    }

    return function (proto: any) {
        //  如果不是一个对象  就返回 一个对象
        if (!(_.isObject(proto))) {
            return {}
        }


        // 创建 object 指定原型为 proto
        if (objectCreate) {
            return objectCreate(proto);
        }

        // 这样创建一个 object
        // 创建的很复杂   建议 去看  原型链这一块
        const result = new object();
        object.prototype = proto;
        object.prototype = undefined;
        return result;

    }
})()

/**
 * @isPrototype 函数判断对象是否为原型对象  Object.prototype  为原型对象
 * @param value  any
 */

export function isPrototype(value: any) {
    /**
     * @ctor  function constructor 构造函数  value =  value.constructor
     * @proto     constructor 必指向  ctor的 prototype
     */
    const ctor = value && value.constructor;
    const proto = (typeof ctor == "function" && ctor.prototype) || objectProto;
    return value === proto;
}

export const nativeObjectToString = objectProto.toString;


/**
 *@getPrototype
 * @param arg  any
 * Object(1)  会得到一个Object 包装后的类型  Number.value  === 1   true
 */
export const getPrototype = (arg: any) => {
    return Object.getPrototypeOf(Object(arg))
}


/**
 * @objectToString
 * @param value
 * @return  string  `[Object object]`
 */
export const objectToString = (value: any) => {
    return nativeObjectToString.call(value);
}


function copyObject(source, props, object, customizer) {


    var isNew = !object;


    object || (object = {});


    var index = -1,
        length = props.length;


    while (++index < length) {
        var key = props[index];


        var newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined;


        if (newValue === undefined) {
            newValue = source[key];
        }


        if (isNew) {

            baseAssignValue(object, key, newValue);


        } else {

            assignValue(object, key, newValue);

        }
    }
    return object;


}


/**
 *
 * @param value
 */
export function baseGetTag(value) {

    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }


    /**
     * 这个逻辑是  symToStringTag  在 Object  是否有这个属性
     *
     */
    return symToStringTag && symToStringTag in Object(value)
        ? getRawTag(value)
        : objectToString(value);


}


/**
 * @getRawTag
 * @param value any
 * @returns  `string`  tag
 *
 *
 * ----- luo
 */
export function getRawTag(value) {
    // hasOwnProperty  是否有这个属性
    /**
     * @tag     String   | Undefined
     * @isOwn   Boolean
     */
    const isOwn = Object.hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    let unmasked: any

    //  如果没有这个属性 -> 会报错  所以需要包裹 一下
    try {
        unmasked = true;
        value[symToStringTag] = undefined;
    } catch (err) {
    }


    const result = nativeObjectToString.call(value);

    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }

    return result;
}


/**
 * @isFunction
 * @param value
 * @param tag
 * 1 isObject 是否是基本类型   是基本类型 就直接返回 false
 * @tag  type String
 */
export function isFunction(value, tag ?: any) {
    if (!_.isObject(value)) {
        return false;
    }


    tag = baseGetTag(value);


    return (
        tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
    );


}

/**
 * @isLength
 * @param value  number
 * 判断 是否为 number  &&  并且不为 负数 && 一定是整数 && 并且在安全范围内
 * @returns  boolean
 */
export function isLength(value: number) {

    return (
        value > -1 &&
        value % 1 == 0 &&
        value <= MAX_SAFE_INTEGER
    );

}


function isObjectLike(value) {
    return value != null && typeof value == "object";
}


export function baseIsArguments(value) {

    return isObjectLike(value) && baseGetTag(value) == argsTag;

}


function arrayLikeKeys(value, inherited) {
    const isArr = _.isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && _.isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;


    for (var key in value) {
        if (
            (inherited || hasOwnProperty.call(value, key)) &&
            !(
                skipIndexes &&
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key == "length" ||
                    // Node.js 0.10 has enumerable non-index properties on buffers.
                    (isBuff && (key == "offset" || key == "parent")) ||
                    // PhantomJS 2 has enumerable non-index properties on typed arrays.
                    (isType &&
                        (key == "buffer" ||
                            key == "byteLength" ||
                            key == "byteOffset")) ||
                    // Skip index properties.
                    isIndex(key, length))
            )
        ) {
            result.push(key);
        }
    }
    return result;
}


/**
 * @isArrayLike
 * @param value any
 * @isLength
 */

function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}

export function keysIn(object) {


    return isArrayLike(object)
        ? arrayLikeKeys(object, true)
        : baseKeysIn(object);


}


export function baseAssignIn(object, source) {

    return object && copyObject(source, keysIn(source), object);
}


export default {
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
