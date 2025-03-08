export function useTags() {
    /**
     * javascript -
     * Object.getPrototypeOf(value).toString()  会得到js 以下的数据类型
     * @param * string
     */



    const arrayBufferTag = "[object ArrayBuffer]",
        dataViewTag = "[object DataView]",
        float32Tag = "[object Float32Array]",
        float64Tag = "[object Float64Array]",
        int8Tag = "[object Int8Array]",
        int16Tag = "[object Int16Array]",
        int32Tag = "[object Int32Array]",
        uint8Tag = "[object Uint8Array]",
        uint8ClampedTag = "[object Uint8ClampedArray]",
        uint16Tag = "[object Uint16Array]",
        uint32Tag = "[object Uint32Array]";


    const arrayBufferTagOb = {
        arrayBufferTag,
        dataViewTag,
        float32Tag,
        float64Tag,
        int8Tag,
        int16Tag,
        int32Tag,
        uint8Tag,
        uint8ClampedTag,
        uint16Tag,
        uint32Tag,

    }


    const argsTag = "[object Arguments]",
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


    const argsTagObj = {
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
    }
    // @ts-ignore
    const symToStringTag = Symbol ? Symbol.toStringTag : undefined;


    const typedArrayTags = {};

    typedArrayTags[float32Tag] = true;
    typedArrayTags[float64Tag] = true;
    typedArrayTags[int8Tag] = true;
    typedArrayTags[int16Tag] = true;
    typedArrayTags[int32Tag] = true;
    typedArrayTags[uint8Tag] = true;
    typedArrayTags[uint8ClampedTag] = true;
    typedArrayTags[uint16Tag] = true;
    typedArrayTags[uint32Tag] = true;

    typedArrayTags[argsTag] = false;
    typedArrayTags[arrayTag] = false;
    typedArrayTags[arrayBufferTag] = false;
    typedArrayTags[boolTag] = false;
    typedArrayTags[dataViewTag] = false;
    typedArrayTags[dateTag] = false;
    typedArrayTags[errorTag] = false;
    typedArrayTags[funcTag] = false;
    typedArrayTags[mapTag] = false;
    typedArrayTags[numberTag] = false;
    typedArrayTags[objectTag] = false;
    typedArrayTags[regexpTag] = false;
    typedArrayTags[setTag] = false;
    typedArrayTags[stringTag] = false;
    typedArrayTags[weakMapTag] = false;
    false;

    return {
        ...arrayBufferTagOb,
        ...argsTagObj,
        typedArrayTags,
        symToStringTag,
    }

}
