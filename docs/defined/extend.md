## 简介
> 类的概念，本身在javascript的语言上是不存在的, 但由于最近人们使用ES6语法，TS语言上都会有的`class extends` 继承的概念, 下面我们需要使用原生js, 结合原型链，实现类的 继承，多态

## ES5实现继承
1. 原型继承
2. 借用构造函数继承
3. mixin 复制继承
4. 寄生继承

### 原型继承方式

原型继承, 主要利用对象的原型链 `__proto__`, 每一个对象都拥有`__proto__`， 它指向的是构造函数的`prototype` 原型对象.

一个对象的属性或函数的寻找会经历以下几个步骤。
以定义 `var o = {};`, 执行 `var toString = o.toString` 为例.

1. 执行 `var tmp = o`，作为临时引用 (为了描述使用)
2. 尝试检查 `tmp` 是否自定义`toString()`,如果存在自定义属性则立即执行。如果当前对象无定义该属性, 进入第3步
3. 尝试检查 `tmp` 是否使用 `Object.defineProperty` 定义`toString` 的属性描述, 如果存在定义，则直接引用，如果不存在则进入第4步
4. 尝试检查 `tmp` 是否存在 `__proto__`,如果存在，则将`tmp = o.__proto__`， 执行第2步; 如果不存在，则返回 `undefined`, 属性查找结束；

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

dog.voice(); // the dog sound
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);

// 隐世指向 Animal.prototype.constructor
console.log(dog.__proto__.constructor === Animal);

```
优点: 
1. 可以使用 instanceof 检测是否是某一个父类
2. 原型链实现方式

缺点:
1. 无法借用父类构造函数

**借用构造函数**

```javascript
// 模拟调用父类函数
Object.prototype.super = function (proto, name) {
  var args = Array.from(arguments).slice(1);
  var proto = proto.__proto__;
  while (proto && null == proto[name]) {
    proto = proto[name];
  }
  if (proto && typeof proto[name] === 'function') {
    return proto[name].apply(this, args);
  }
  console.warn('the instance have not super ' + name + ' function');
};
function Animal (name) {
  this.name = name;
}

Animal.prototype.voice = function () {
  console.log(this.name + ' sound');
};

function Dog (name, type) {
  Animal.apply(this, [name]);
  this.type = type;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Animal;

Dog.prototype.voice = function () {
  console.log('the dog type is ' + this.type);
  this.super(Animal.prototype, 'voice');
};

var dog = new Dog('二哈', '哈士奇');
dog.voice();
// the dog type is 哈士奇
// 二哈 sound
```

优点:
1. 能够借用父类构造函数
2. 具备链式调用函数

缺点:
1. 子类构造函数需要调用父类构造函数

**mixin复制继承**

依靠对象拷贝属性的方式, 给予一个源对象未有的属性赋值

```javascript

function mixin(source, target) {
  for (var name in target) {
    if (!source[name]) {
      source[name] = target[name];
    }
  }
  return source;
}

var Animal = {
  name: 'animal',
  voice: function () {
    console.log('the name is ' , this.name);
    console.log('voice~~');
  }
};
var Cat = mixin({
  name: 'cat',  
  sound: function () {
    return this.voice();
  }
}, Animal);

var helloKitty = mixin({
  name: 'hello keitty'
}, Cat);

helloKitty.sound();

```
优点:
1. 实现简单，只需要进行复制属性和方法

缺点:
1. 处理对象都为对象, 没有处理构造函数
2. 无法实现子类调用父类的场景

**寄生继承**

寄生继承属于重写, 新增父类创建的对象的属性, 返回扩展的对象

```javascript
function Animal() {
  this.speed = 10;
}

Animal.prototype.run = function () {
  console.log('speed is ' + this.speed);
}

function Cat () {
  var animal = new Animal();
  var runFn = animal.run;

  animal.speed = 20;  
  animal.run = function () {
    console.log('the cat will run');
    runFn.apply(this, arguments);
  };
  return animal;
}
var cat = new Cat();
console.log(cat instanceof Cat);
```

优点:
1. 结合原型属性和实例属性实现方案

缺点:
1. 无法共享属性, 每一个新的对象都创建新的实例属性和方法


### `Object.create`

`Object.create` 是ES5定义的方法, 相比于字面量对象，构造函数对象, 又一种新的创建对象的方式。

```javascript
var prototype = {foo: 1};
var o = Object.create(prototype);
console.log(o.foo); // 1
o.foo = 100;
console.log(o.foo); // 100
delete o.foo;
console.log(o.foo); // 1
console.log(o.__proto__ === prototype); // true
```
从上面可以看见, `Object.create` 传入一个对象，同时会返回一个新的对象，而这个新的对象的`__proto__`指向传入对象

**Object.create(null)**

返回一个无原型链的空对象, 对象的所有属性均为实例属性

**Object.create 的 polyfill**

```javascript
// 简化版 polyfill
Object.create = Object.create || function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};

```

## ES6 的 class extends
说完ES5的实现方式，我们来聊聊ES6自带的语法。 `class` 与 `class extends`

### ES6里的类
参照其它语言，如 `java`, 类中存在静态属性, 静态方法, 实例属性，实例方法.

**声明一个类**
```javascript
class Rectangle {
  // 类的构造函数
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
let rect = new Reactangle(320, 240);
console.log(rect.height, rect.width);
```
**注意: 类不存在声明提前的概念，必须先定义后使用**

### 使用 extends 创建子类

```javascript
class Animal { 

  constructor(name) {
    // 实例属性
    this.name = name;
  }
  // 原型属性描述
  get fullname () {
    console.log(this.name);
  }

  // 原型方法
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

// 静态属性
Animal.name = 'Animal';

class Dog extends Animal {
  construcotr(name) {
    // 调用父类构造函数
    super(name);
  }
  speak() {
    console.log(this.name + ' barks.');
  }
  // 静态方法只适合创建工具函数
  // 返回 undefined
  static eat() {
    return this;
  }
}

var d = new Dog('Mitzie');
// 'Mitzie barks.'
d.speak();
```
实际上ES6的`class` 与 `class extends` 也是使用的原型链方式实现继承关系。 `super` 是一个关键词, 实际上是指向父类的`prototype`, 在`constructor` 使用`super()`, 可以调用父类的构造函数， 使用`super.method()` 可以调用父类的`原型方法`。
原型属性采用ES5的`defineProperty`定义属性描述来实现。

## 小结
目前JS的使用场景越来越广, 面向对象编程的使用也越来越多, 前端已经Node.js都有需要用到类与继承。 同时这也是多年来不变的前端JS考题。

## 相关知识推荐

- [Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [ES6 Class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
