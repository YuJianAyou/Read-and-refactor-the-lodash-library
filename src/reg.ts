
// 这个正则是以  ?:0 或者是 1-9后面\d* 匹配任意多个数字
// ?: 捕获组的意思  匹配 非负整数
const  reIsUint = /^(?:0|[1-9]\d*)$/;

export    {
    reIsUint
}
