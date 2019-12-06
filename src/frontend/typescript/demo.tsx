/**
 * 使用typescript实现函数 caller, 接受一个函数作为第一个参数，返回值类型，其它函数类型由接受的函数参数决定
 */


 function caller <T, U>(fn: Function) {
    return  (...args) : U => {
        return fn(...args);
    };
 }