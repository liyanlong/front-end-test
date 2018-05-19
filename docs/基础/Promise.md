## 前言 
> JavaScript 是单线程语言, 意味着两段脚本不能同时进行, 在浏览器中，JavaScript 与因浏览器而异的其他 N 种任务共享一个线程。但是通常情况下 JavaScript 与绘制、更新样式和处理用户操作（例如，高亮显示文本以及与格式控件交互）处于同一队列。操作其中一项任务会延迟其他任务。

**JS存在的多种任务**
```javascript
// 事件侦听器
window.addEventListener('onload', function () {});

// 定时任务
setTimeout(function (){ console.log('loaded')}, 0)

// 重排,重绘 引起JS线程处理绘制, 非异步阻塞
document.body.offsetWidth;
document.body.style.backgroundColor = '';

// 异步请求
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // xhr.responseText
  }
};
```

## JS回调

**普通回调编程**
```javascript
function fn1 (cb) {
  console.log('fn1 run')  
  setTimeout(cb, 200)
}

function fn2 (cb) {
  console.log('fn2 run')
  cb()
}
function fn3 (cb) {
  console.log('fn3 run')
  cb()
}

fn1(function _a() {
  console.log('fn1 done')
  fn2(function _b() {
    console.log('fn2 done')
    fn3(function _c() {
      console.log('fn3 done')
    })
  })
})
```
**结论：** 

200ms等待后执行`fn1`后, 同步回调执行 `fn2`, 执行结束后同步回调执行`fn3`.

**出现的问题:**

多层级嵌套情况下产生比较深的作用域链及执行栈.

**最长作用域:**

`_c -> _b -> _a -> global`

**fn1的执行栈:**
```
- empty
fn1
fn1 -> _a
fn1 -> _a -> fn2
fn1 -> _a -> fn2 ->_b
fn1 -> _a -> fn2 ->_b -> fn3
fn1 -> _a -> fn2 ->_b -> fn3 -> _c
fn1 -> _a -> fn2 ->_b -> fn3
fn1 -> _a -> fn2 ->_b
fn1 -> _a -> fn2
fn1 -> _a
fn1
- empty
```


**优化回调嵌套**
```javascript
function fn1() {
  console.log('fn1 run')
  setTimeout(function _a() {
    console.log('fn1 done')
    fn2()    
  }, 200)
}
function fn2() {
  console.log('fn2 run')
  console.log('fn2 done')
  fn3()  
}

function fn3() {
  console.log('fn3 run')
  console.log('fn3 done')  
}
fn1()
```

**结论:** 

与第一种执行方式相比, 这种方式会优化执行栈和作用域链。不过却增强了执行函数的耦合关系

**最长作用域:**

`fn2 -> _a -> fn1 -> global`

**执行栈：**

```
fn1
fn1 -> _a
fn1 -> _a -> fn2
fn1 -> _a -> fn2 -> fn3
fn1 -> _a -> fn2
fn1 -> _a
fn1
```

**并行异步回调**

## Promise 

> Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象


![Promise 原理](../img/promise.png)


**Promise与事件侦听器区别**

- promise 只能成功或失败一次，而不能成功或失败两次，也不能从成功转为失败或从失败转为成功。
- 如果 promise 已成功或失败，且您之后添加了成功/失败回调，则将会调用正确的回调，即使事件发生在先。


## 基本用法

**`new Promie()`**



## 运用场景


## 相关类库


## 如何自行封装一个Promise对象

## 参考文章
- [JavaScript Promise：简介](https://developers.google.com/web/fundamentals/primers/promises?hl=zh-cn)
- [Promise MDN](https://developer.mozilla.org/zh-CN/9docs/Web/JavaScript/Reference/Global_Objects/Promise)
