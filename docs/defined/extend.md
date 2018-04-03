## 继承

### 简介

### 实现
1. 原型继承
2. 借用构造函数继承
3. 


#### 原型继承方式
**介绍**

主要利用对象的原型链 `__proto__`, 每一个对象都拥有`__proto__`， 它指向的是构造函数的`prototype` 原型对象.

一个对象的属性或函数的寻找会经历以下几个步骤。 以定义 `var o = {};`, 执行 `var toString = o.toString` 为例.

1. 执行 `var tmp = o`，作为临时引用 (为了描述使用)
2. 尝试检查 `tmp` 是否自定义`toString()`,如果存在自定义属性则立即执行。如果当前对象无定义该属性, 进入第3步
3. 尝试检查 `tmp` 是否使用 `Object.defineProperty` 定义`toString` 的属性描述, 如果存在定义，则直接引用，如果不存在则进入第4步
4. 尝试检查 `tmp` 是否存在 `__proto__`,如果存在，则将`tmp = o.__proto__`， 执行第2步; 如果不存在，则返回 `undefined`, 属性查找结束；

```javascript
Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'next') {
      return fn.apply(this, arguments);
    }
  };
}
Object.prototype.getName = function () {
  console.log('the name is: ', this.name);
};

var fn = function () {};

// fn.constructor => Function
// fn.__proto__ => fn.constructor.prototype => Function.prototype
// fn.__proto__.after => Function.prototype.after
console.log(fn.after);

// fn.constructor => Function
// fn.__proto__ => Function.prototype
// Function.prototype.getName => undefined
// Function.prototype.__proto__ => Object.prototype
// Function.prototype.__proto_.getName => Object.prototype.getName
console.log(fn.getName());
```
`fn` 函数原型继承于 `Function.prototype`, 又原型继承与 `Object.prototype`;

**具体案例**
```javascript
function Animal () {
  throw new Error('抽象类, 不允许直接实例化');
}
Animal.prototype.voice = function () {
  console.log('the ' + this.name + ' sound');
}

function Dog () {
  this.name = 'dog';
}
Dog.prototype = Object.create(Animal.prototype);

// 显示指向
Dog.prototype.constructor = Dog;

var dog = new Dog();
dog.voice();
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);

// 隐世指向
console.log(dog.__proto__.constructor === Animal)
```
优点: 
1. 可以使用 instanceof 检测是否是父类