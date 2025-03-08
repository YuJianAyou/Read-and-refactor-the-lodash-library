/*
*  参考lodash 实现 功能函数
*
* 大量的使用了this  后期没办法修改-------
 */


// @ts-ignore
import {r, u, e, A} from './types';

import {useTags} from "./tags"

import {
    baseAssignIn ,
    objectToString,
    isPrototype,
    baseCreate,
    getPrototype,
    getRawTag,
    baseIsArguments,
    copyObject,
    baseAssign,
    getSymbols,
    getSymbolsIn ,
} from "./func"


const {
    argsTag,
    undefinedTag,
    funcTag,
    genTag,
    nullTag,
    objectTag,
    symToStringTag,
} = useTags();


/**
 * - CLONE_DEEP_FLAG指示对象应深度克隆。如果将此标志与克隆函数一起使用，则会深度克隆对象，包括它的所有嵌套属性。
 * - CLONE_FLAT_FLAG指示对象应扁平克隆。如果将此标志与克隆函数一起使用，则会扁平克隆对象，即只复制顶级属性，而不会复制嵌套属性。
 * - CLONE_SYMBOLS_FLAG指示对象应复制Symbol属性。如果将此标志与克隆函数一起使用，则会复制对象的Symbol属性。
 */
const CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;


function CLONE_OPTIONS(bitmask) {
    const isDeep = bitmask & CLONE_DEEP_FLAG,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG;
    return {
        isDeep,
        isFlat,
        isFull
    }
}

const nativeIsBuffer = (v: any) => {
    // @ts-ignore
    return Buffer.isBuffer(v)
}

const stubFalse = () => false;

const allocUnsafe = (length: any) => {
    // @ts-ignore
    return Buffer ? Buffer.allocUnsafe : undefined
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

    initCloneObject(object: any) {

        return typeof object.constructor == "function" && !isPrototype(object)
            ? baseCreate(getPrototype(object))
            : {};

    }

    copySymbolsIn(source: any, obejct: any) {
        return copyObject(source, getSymbolsIn(source), obejct);
    }

    copySymbols(source: any, object: any) {
        return copyObject(source, getSymbols(source), object);
    }
}

export class U extends F implements u {

    constructor() {
        super();
    }

    isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    isString(value: any) {
        return typeof value === 'string';
    }


    isBaseObject(value: any) {
        const type = typeof value;
        return value != null && type === 'object' && !(value instanceof Array);
    }


    isObject(value: any) {
        const type = typeof value;
        return value != null && (type == "object" || type == "function");
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

    isArguments(value: any) {
        return baseIsArguments(value)
    }

}

class E extends U implements e {
    constructor() {
        super()
    }
    baseClone(value: any, bitmask?: number, customizer?: (value: any, key?: string, object?: any, stack?: any) => {}, key?: string, object?: any, stack?: any) {

        /**
         * bitmask & CLONE_DEEP_FLAG, 按位与  二进制比较
         * 5的二进制是0101，3是0011，按位与的结果是0001，
         * 即1。此外，需要注意负数在按位与运算中是以补码形式处理的，这可能会影响结果。
         */
        let result: any;

        /**
         * @isDeep 是否为深度克隆
         * @isFlat 对象应扁平克隆  只复制顶层对象
         * @isFull 是否复制symbol
         */
        const {
            isDeep,
            isFlat,
            isFull
        } = CLONE_OPTIONS(bitmask)


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
         * @isArr  `Boolean
         */
        const isArr = this.isArray(value);


        if (isArr) {
            result = this.initCloneArray(value);
            if (!isDeep) {
                return this.copyArray(value, result);
            }

        } else {


            /**
             *@params tag  `string` `[Object object]`
             */
            const tag = this.getTag(value),
                isFunc = tag == funcTag || tag == genTag;


            //   if type buffer  clone  buffer


            if (this.isBuffer(value)) {
                return this.cloneBuffer(value, isDeep);
            }


            // if type Object  ||  tag  type is Argument || isFunc


            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {

                //  result is  Object     {}    || clone {}


                result = (isFlat || isFunc) ? {} : this.initCloneObject(value);


                /**
                 * @isDeep  Boolean     是否为深度克隆
                 * @isFlat Boolean      是否复制为顶层对象
                 * @baseAssignIn
                 * @baseAssign
                 */


                // isFlat  ?是否扁平化 克隆 Symbols    ?
                if (!isDeep) {
                    return isFlat
                        ? this.copySymbolsIn(value, baseAssignIn(result, value))
                        : this.copySymbols(value, baseAssign(result, value));
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
        return this.baseClone(value, CLONE_SYMBOLS_FLAG)
    }


}

export default new Redash()
