import { describe, it, expect } from 'vitest';



import _ from "../src/index"






describe('判断函数测试', () => {
    it('isArray', () => {
        expect(_.isArray([1])).toBeTruthy();
        expect(_.isArray({})).toBeFalsy();
        expect(_.isArray(1)).toBeFalsy();
        expect(_.isArray("")).toBeFalsy();
    });
});
