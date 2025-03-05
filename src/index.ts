/*
*  参考lodash 实现 功能函数
*
* 大量的使用了this  后期没办法修改-------
 */
import tag from "./tag"

const {
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
} = tag ;

interface u {

    isArray(value: any): boolean

    isBoolean(value: any): boolean

    isObject(value: any): boolean

    isString(value: any): boolean

    isNumber(value: any): boolean

    isNull(value: any): boolean

    isRegExp(value: any): boolean

    isDate(value: any): boolean

    isNil(value: any): boolean

    isBuffer(value: any): boolean
}

interface e {
    baseClone(): any
}

interface r {
    clone(value: any): any
}

type A<T> = Array<T>


const CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;


const nativeIsBuffer = (v: any) => {
    // @ts-ignore
    return Buffer.isBuffer(v)
}

const stubFalse = () => false;

const allocUnsafe = (length: any) => {
    // @ts-ignore
    return Buffer ? Buffer.allocUnsafe : undefined
}

function getRawTag(value) {

    const  isOwn = Object.hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];



    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }
    return result;
}


class F {
    constructor() {
    }

    initCloneArray(array: A<any>): A<any> {

        interface o {
            index?: any;
            input?: any;
        }

        type c<T> = T & o;
        const length = array.length;
        const result: c<A<any>> = new Array(length);


        /**
         * create Array
         * length
         * 是什么操作 ?
         */
        if (
            length &&
            typeof array[0] == "string" &&
            Object.hasOwnProperty.call(array, "index")
        ) {
            result.index = (array as any).index;
            result.input = (array as any).input;
        }
        return result;
    }

    copyArray(array: A<any>, r: A<any>): A<any> {
        // lodash 中是采用的循环遍历的方式 copy
        //  我采用 ... copy
        r = array
        return [
            ...r,
        ]
    }


    getTag(value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
        }

        return symToStringTag && symToStringTag in Object(value)
            ? getRawTag(value)
            : objectToString(value);

    }

}


class U extends F implements u {

    constructor() {
        super();
    }

    isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    isString(value: any) {
        return typeof value === 'string';
    }

    isObject(value: any) {


        return value != null && typeof value === 'object' && !(value instanceof Array);
    }

    isArray(value: any) {
        return Array.isArray(value) || false
    }

    isNumber(value: any) {
        return typeof value === 'number';
    }

    isRegExp(value: any) {
        return value instanceof RegExp
    }

    isNull(value: any) {
        return value === null;
    }

    isDate(value: any) {
        return value instanceof Date
    }

    isNil(value: any) {
        return value == null;
    }

    isBuffer(value: any) {
        // buffer 数据类型是 node.js 中有的.
        // @ts-ignore
        const b = Buffer ? Buffer.isBuffer : undefined;

        if (b) {
            return nativeIsBuffer(value)
        } else {
            return stubFalse()
        }


    }

}

class E extends U implements e {
    constructor() {
        super()
    }

    baseClone(value: any, bitmask?: number, customizer?: () => {}, key?: string, object?: any, stack?: any) {

        /**
         * bitmask & CLONE_DEEP_FLAG, 按位与  二进制比较
         * 5的二进制是0101，3是0011，按位与的结果是0001，
         * 即1。此外，需要注意负数在按位与运算中是以补码形式处理的，这可能会影响结果。
         */
        let result: any;
        const isDeep = bitmask & CLONE_DEEP_FLAG,
            isFlat = bitmask & CLONE_FLAT_FLAG,
            isFull = bitmask & CLONE_SYMBOLS_FLAG;


        if (customizer) {
            result = object
                ? customizer(value, key, object, stack)
                : customizer(value);
        }


        if (result !== undefined) {
            return result;
        }


        if (!this.isObject(value)) {
            return value;
        }

        /**
         * 如果是数组 clone 数组
         */
        const isArr = this.isArray(value);

        if (isArr) {
            result = this.initCloneArray(value);
            if (!isDeep) {
                return this.copyArray(value, result);
            }
        } else {


            var tag = getTag(value),
                isFunc = tag == funcTag || tag == genTag;


            //   if type buffer  clone  buffer
            if (this.isBuffer(value)) {
                return this.cloneBuffer(value, isDeep);
            }


            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                result = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                    return isFlat
                        ? copySymbolsIn(value, baseAssignIn(result, value))
                        : copySymbols(value, baseAssign(result, value));
                }
            } else {
                if (!cloneableTags[tag]) {
                    return object ? value : {};
                }
                result = initCloneByTag(value, tag, isDeep);
            }
        }


        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
            return stacked;
        }
        stack.set(value, result);


        if (isSet(value)) {
            value.forEach(function (subValue) {
                result.add(
                    baseClone(subValue, bitmask, customizer, subValue, value, stack)
                );
            });
        } else if (isMap(value)) {
            value.forEach(function (subValue, key) {
                result.set(
                    key,
                    baseClone(subValue, bitmask, customizer, key, value, stack)
                );
            });
        }


        var keysFunc = isFull
            ? isFlat
                ? getAllKeysIn
                : getAllKeys
            : isFlat
                ? keysIn
                : keys;


        var props = isArr ? undefined : keysFunc(value);


        arrayEach(props || value, function (subValue, key) {
            if (props) {
                key = subValue;
                subValue = value[key];
            }
            // Recursively populate clone (susceptible to call stack limits).
            assignValue(
                result,
                key,
                baseClone(subValue, bitmask, customizer, key, value, stack)
            );
        });

        return result;
    }

    cloneBuffer(buffer: any, isDeep: number) {
        //   浅复制
        if (isDeep) {
            return buffer.slice();
        }

        let length = buffer.length,
            result = allocUnsafe
                ? allocUnsafe(length)
                : new buffer.constructor(length);

        buffer.copy(result);

        return result;
    }
}


class Redash extends E implements r {

    constructor() {
        super();
    }

    /**
     *  以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象, regexes, sets, strings, symbols, 以及 typed arrays。 arguments对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。
     * @param value
     */
    clone(value: any) {
        return this.baseClone(value)
    }


}


export default new Redash()
