import {describe, it, expect} from 'vitest';
import _ from "../src/index"


import {
    baseCreate,
    isPrototype,
    isFunction,
    baseGetTag,
    getRawTag,
    isLength,
    isObjectLike,
    baseIsArguments, baseTimes, nativeKeysIn, getSymbolsIn,propertyIsEnumerable
} from "../src/tag"


describe('判断函数测试 ---------', () => {

    it('isArray', () => {
        expect(_.isArray([])).toBeTruthy(); //true
        expect(_.isArray({})).toBeFalsy(); //false
        expect(_.isArray(1)).toBeFalsy(); //false
        expect(_.isArray("")).toBeFalsy(); //false
    });

    it('isBoolean', () => {
        expect(_.isBoolean(true)).toBeTruthy(); //true
        expect(_.isBoolean(false)).toBeTruthy(); //true
        expect(_.isBoolean(1)).toBeFalsy(); //false
        expect(_.isBoolean({})).toBeFalsy(); //false
        expect(_.isBoolean([])).toBeFalsy(); //false
    });

    it('isString', () => {
        expect(_.isString("true")).toBeTruthy(); //true
        expect(_.isString(false)).toBeFalsy(); //false
        expect(_.isString(1)).toBeFalsy(); //false
        expect(_.isString({})).toBeFalsy(); //false
        expect(_.isString([])).toBeFalsy(); //false
    });

    it('isObject', () => {
        expect(_.isObject({})).toBeTruthy(); //true
        expect.soft(_.isObject(() => {
        })).toBeTruthy(); //true
        expect(_.isObject([])).toBeTruthy(); //true

        expect(_.isObject(false)).toBeFalsy(); //false
        expect(_.isObject(1)).toBeFalsy(); //false
        expect(_.isObject(null)).toBeFalsy(); //false
        expect(_.isObject("")).toBeFalsy(); //false
    });

    it('isNumber', () => {
        expect(_.isNumber(1)).toBeTruthy(); //true
        expect(_.isNumber({})).toBeFalsy(); //false
        expect(_.isNumber(false)).toBeFalsy(); //false
        expect(_.isNumber(null)).toBeFalsy(); //false
        expect(_.isNumber([])).toBeFalsy(); //false
        expect(_.isNumber("")).toBeFalsy(); //false
    });

    it('isRegExp', () => {
        expect(_.isRegExp(/^1/)).toBeTruthy(); //true
        expect(_.isRegExp(1)).toBeFalsy(); //false
        expect(_.isRegExp({})).toBeFalsy(); //false
        expect(_.isRegExp(false)).toBeFalsy(); //false
        expect(_.isRegExp(null)).toBeFalsy(); //false
        expect(_.isRegExp([])).toBeFalsy(); //false
        expect(_.isRegExp("")).toBeFalsy(); //false
    });

    it('isNull', () => {
        expect(_.isNull(null)).toBeTruthy(); //true
        expect(_.isNull(1)).toBeFalsy(); //false
        expect(_.isNull({})).toBeFalsy(); //false
        expect(_.isNull(false)).toBeFalsy(); //false
        expect(_.isNull([])).toBeFalsy(); //false
        expect(_.isNull("")).toBeFalsy(); //false
    });

    it('isNil', () => {
        expect(_.isNil(null)).toBeTruthy(); //true
        expect(_.isNil(1)).toBeFalsy(); //false
        expect(_.isNil({})).toBeFalsy(); //false
        expect(_.isNil(false)).toBeFalsy(); //false
        expect(_.isNil([])).toBeFalsy(); //false
        expect(_.isNil("")).toBeFalsy(); //false
    });
});


describe('函数测试---------', () => {

    //  是否是原型对象
    it('isPrototype', () => {
        expect.soft(isPrototype({})).toBeFalsy()
    });


    it('baseCreate', () => {
        expect.soft(baseCreate({a: `name`})).toStrictEqual({});
    });



    it('isFunction', () => {
        // @ts-ignore
        const p = Proxy

        // @ts-ignore
        async function f() {
        }

        expect.soft(isFunction(f)).toBeTruthy();
        expect.soft(isFunction(p)).toBeTruthy();
        expect.soft(isFunction({})).toBeFalsy();

    });



    it('baseGetTag', () => {


        expect.soft(baseGetTag(undefined)).toStrictEqual(`[object Undefined]`);
        expect.soft(baseGetTag(null)).toStrictEqual(`[object Null]`);
        expect.soft(baseGetTag(1)).toStrictEqual(`[object Number]`);
        expect.soft(baseGetTag({})).toStrictEqual(`[object Object]`);
        expect.soft(baseGetTag([])).toStrictEqual(`[object Array]`);
        expect.soft(baseGetTag(true)).toStrictEqual(`[object Boolean]`);


    });




    it('isLength', () => {
        expect.soft(isLength(1)).toBeTruthy()
        expect.soft(isLength(-11)).toBeFalsy();

    });




    it('getRawTag', () => {
        expect.soft(getRawTag(1)).toStrictEqual(`[object Number]`);
    });






    it('isObjectLike', () => {
        expect.soft(isObjectLike([])).toBeTruthy();
    });



    it('baseIsArguments', () => {
        function test() {
            return arguments
        }

        expect.soft(baseIsArguments(test())).toBeTruthy();
    });


    it("isArguments", () => {
        expect.soft(_.isArguments((function () {
            return arguments
        })())).toBeTruthy();
    })


    it("baseTimes", () => {
        const arr = [1, 2, 3]
        expect.soft(baseTimes(arr.length, String)).toStrictEqual([`0`, `1`, `2`])
    })


    it("nativeKeysIn", () => {
        expect.soft(nativeKeysIn({name: `test`, age: `18`})).toStrictEqual([`name`, `age`])
    })
    it("getSymbolsIn", () => {
        // expect.soft(getSymbolsIn( {name:`test`})).toStrictEqual()
    })








    it("clone", () => {

        const arr = [1,2,3];


        const obj = {} ;

        expect(_.clone( arr) ).not.toBe(arr); // toBe 检查是否是同一个引用


        expect.soft(_.getTag( obj )).toStrictEqual(`[object Object]`)


        expect.soft(_.initCloneObject( obj )).not.toBe(obj)



        // expect(_.clone( () => {}) ).toStrictEqual({})



    })






});





describe('js自带属性测试  ', () => {

   //  propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否是对象的可枚举自有属性。
    it('propertyIsEnumerable', () => {
        const test =  {
            name : `test`
        }
        expect.soft(propertyIsEnumerable.call(test,"name")).toBeTruthy()
    })
})
