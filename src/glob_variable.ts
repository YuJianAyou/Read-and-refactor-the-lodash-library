export const INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e308,
    NAN = 0 / 0;


export  const arrayProto = Array.prototype;
export const funcProto = Function.prototype;
export const objectProto = Object.prototype;
export const objectCreate = Object.create;


// 方法返回一个布尔值，表示指定的属性是否是对象的可枚举自有属性。
export  const propertyIsEnumerable = objectProto.propertyIsEnumerable;


// @ts-ignore
// Object.getOwnPropertySymbols() 静态方法返回一个包含给定对象所有自有 Symbol 属性的数组
export const nativeGetSymbols = Object.getOwnPropertySymbols;
