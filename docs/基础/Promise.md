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

**执行栈:**

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

```javascript
function taskA(cb) {
  console.log('taskA start');
  setTimeout(function () {
    console.log('taskA end');
    cb(1);
  }, 200);
}

function taskB(cb) {
  console.log('taskB start');  
  setTimeout(function () {
    console.log('taskB end');
    cb(2);
  }, 500);
}

function runTask(cb) {
  var flagA = false, flagB = false;
  var dataA = null, dataB = null;

  taskA(function (data) {
    flagA = true;
    dataA = data;
    if (flagB) {
      cb([dataA, dataB]);
    }
  });
  taskB(function (data) {
    flagB = true;
    dataB = data;
    if (flagA) {
      cb([dataA, dataB]);
    }
  });
}
console.log('task start')
runTask(function (data) {
  console.log('task end');
  console.log(data);  
});
```

**结论:**
场景中如果有多个异步请求需要并行, 普通的回调的处理方式就比较复杂了, 上述采用了 `flag` 变量。

**优化异步回调**

```javascript
function Task(fn) {
  this.status = 'loading';
  this.data = null;
  this.err = null;
  this.next = null;
  var self = this;

  this.finish = function (onResolve, onReject) {
    var res = new onResolve(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
    cb.call(this, self.data);
  };

  this.catch = function (cb) {
    cb.call(this, self.err);
  };

  function resolve(data) {
    self.status = Task.status.SUCCESS;
    self.data = data;
  }
  
  function reject(err) {
    self.status = Task.status.ERROR;
    self.err = err;
  }

  try {
    fn.call(this, resolve, reject);
  } catch (error) {
    reject(error);
  }

}

Task.status = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

Task.all = function (list) {
  var self = this;
  var count = list.length;
  var seed = 0;
  var _task = new Task(function (resolve, reject) {
    list.forEach(function (task) {
      task.finish(function (val) {
        seed++;
        if (seed === count) {
          var data = list.map(function (t) {
            return t.data;
          });
          resolve(data);
        }
      });
    })
  });
  return _task;
}
var taskA = new Task(function (resolve) {
  console.log('taskA start');
  setTimeout(function () {
    console.log('taskA end');
    resolve(1);
  }, 200);
});

var taskB = new Task(function (resolve) {
  console.log('taskB start');  
  setTimeout(function () {
    console.log('taskB end');
    resolve(2);
  }, 200);
});

Task.all([taskA, taskB]).finish(function (data) {
  console.log('task done');
  console.log(data);
});
```


## Promise 

> Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象


![Promise 原理](../img/promise.png)


**Promise与事件侦听器区别**

- promise 只能成功或失败一次，而不能成功或失败两次，也不能从成功转为失败或从失败转为成功。
- 如果 promise 已成功或失败，且您之后添加了成功/失败回调，则将会调用正确的回调，即使事件发生在先。


## 基本用法

**`new Promie()`**

```js
function fetchData (url) {
  return new Promise(function (resolve) {
    $.getJSON(url, function (data) {
      resolve(data);
    });
  });
}

fetchData('/api/user_info').then(function (data) {
  // ...
});

// 注意!
var p = fetchData('/api/user_info');
p.then(function (data) {
  // ...
});

// 第二次不会再次发送请求， 而是将已暂存的数据再次传递给then的回调函数
p.then(function (data) {
  // ...
});
```



## 运用场景
- 多个异步任务成功后的回调处理
- 异步任务顺序执行

## 相关类库
- blubird
- Q.js
- es6-promise


## 参考文章
- [JavaScript Promise：简介](https://developers.google.com/web/fundamentals/primers/promises?hl=zh-cn)
- [Promise MDN](https://developer.mozilla.org/zh-CN/9docs/Web/JavaScript/Reference/Global_Objects/Promise)
