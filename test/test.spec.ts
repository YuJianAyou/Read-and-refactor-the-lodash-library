import {describe, it, expect} from 'vitest';
import _ from "../src/index"


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
        expect(_.isObject(false)).toBeFalsy(); //false
        expect(_.isObject(1)).toBeFalsy(); //false
        expect(_.isObject(null)).toBeFalsy(); //false
        expect(_.isObject([])).toBeFalsy(); //false
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


describe('clone 函数测试---------', () => {

    /**
     * 函数测试为生成不同的 数据  两个数据为不等
     * 修改 a  不影响 b  修改b  不影响 a
     */
    it('clone', () => {
        expect(_.isArray([])).toBeTruthy(); //true

    });
});
