
declare module "types" {
    export interface r {
        clone(value: any): any
    }
    export interface u {

        isArray(value: any): boolean

        isBoolean(value: any): boolean

        isBaseObject(value: any): boolean

        isObject(value: any): boolean

        isString(value: any): boolean

        isNumber(value: any): boolean

        isNull(value: any): boolean

        isRegExp(value: any): boolean

        isDate(value: any): boolean

        isNil(value: any): boolean

        isBuffer(value: any): boolean

        isArguments(value: any): boolean
    }
    export interface e {
        baseClone(): any
    }
    export type A<T> = Array<T>
}
