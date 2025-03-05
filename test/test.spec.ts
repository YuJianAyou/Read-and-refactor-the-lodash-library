import { describe, it, expect } from 'vitest';
import _ from "../src/index"


describe('判断函数测试', () => {

    it('isArray', () => {
        expect(_.isArray([])).toBeTruthy(); //true
        expect(_.isArray({})).toBeFalsy(); //false
        expect(_.isArray(1)).toBeFalsy(); //false
        expect(_.isArray("")).toBeFalsy(); //false
    });


});
