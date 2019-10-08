---
title: ES6新特性Proxy和Reflect
date: 2019-10-08T05:55:49.443Z
description: ES6中添加了很多新特性，Proxy让我们能监听对于对象的各种操作
tags:
  - javascript
  - es6
categories:
  - 编码
template: post
---
Vue3源码放出来了，新特性包括用ES6中的Proxy替换了通过Object.defineProperty，这里重新来了解一下Proxy这个新特性。


## 浏览器支持情况
先来看看[caniuse](https://www.caniuse.com/#feat=proxy)上面给出来的浏览器支持情况，看样子vue3是不支持ie11了。edge, firefox, chrome, safari这些市场占有率比较高的浏览器都是没有问题的。
![浏览器支持情况](https://ww1.sinaimg.cn/large/006rHsX4gy1g7pr0np7jrj31wz0sktf2.jpg)

## 数组问题
Vue中对于数组的操作监听有些限制，Vue对被侦听数组的push,pop等方法都进行了包装，通过这些方法进行操作数组都能触发视图的更新，但是如果直接通过下标索引修改某项的值或者修改数组的length属性，Vue并不能检测到。
```javascript
vm.items[1] = 'x';
vm.items.length = 2;
```
上面这些修改都不是响应的。通过ES6的proxy可以监测到这些改变。


## 什么是Proxy, Relfect
ES5，ES6对javascript的功能做了极大的扩展，将js环境中一个功能提升到语法层面，让语言的使用者也可以使用这些特性。ES5中添加了Object.defineProperty()，然用户可以定义不可修改的对象，以及属性是否可以枚举，对属性的读取和修改进行监听等等，这些原来js引擎自身已经包含的功能。

ES6中添加的API为语言的使用者提供了更强的能力，Proxy就是其中的一个。Proxy翻译过来就是代理，顾名思义在目标对象之外包装一层，对目标对象的操作都是由代理对象转发，这样我们可以在对目标对象实行真正的操作之前执行一些额外的逻辑。Vue3中就是通过Proxy这种机制现数据读写的监听，来实现数据的双向绑定。

Proxy通过trap来实现这种对象操作的监听，trap是一个函数，当对代理对象执行某些操作的时候，相应的trap函数就会被执行。

Reflect翻译过来是反射，Reflect对象提供了一系列方法，对于Proxy中定义trap的默认操作。


## 语法
```
let p = new Proxy(target, handler);
```
### 参数
1. target - 需要被包装的目标对象，我们将包装之后的对象称之为代理对象。
2. handler - 一个js对象，定义一些trap用来检测对被代理对象的操作。


### traps
handler中可以包含以下trap。

| Proxy Trap | Override the Behavior Of | Default Behavior |
|:----------:|:------------------------:|:----------------:|
| get | Reading a property value | Reflect.get() |
| set |write to a property| Reflect.set()|
|has|the in operator|Reflect.has()|
|deleteProperty|the delete opeartor|Reflect.deleteProperty()|
|getPrototypeOf|Object.getPrototypeOf()|Reflect.getPrototypeOf()|
|setPrototypeOf|Object.setPrototypeOf()|Reflect.setPrototypeOf()|
|isExtensible|Object.isExtensible()|Reflect.isExtensible()|
|preventExtensions|Object.preventExtensions()|Reflect.preventExtensions()|
|getOwnPropertyDescriptor|Object.getOwnPropertyDescriptor()|Reflect.getOwnPropertyDescriptor()|
|defineProperty|Object.defineProperty()|Reflect.defineProperty()|
|ownKeys|Object.keys, Object.getOwnPropertyNames(), Object.getOwnPropertySymbols()|Reflect.ownKeys()|
|apply|calling a function|Reflect.apply()|
|construct|calling a function with new|Reflect.construct()|


#### trap get
```javascript
let handler = {
    get(obj, prop, receiver){
        return prop in receiver ? 
            Reflect.get(obj, prop, receiver) :
            'default'
    }
};

let p = new Proxy({a:1}, handler);
console.log(p.a);       //  1
console.log(p.b);       // default

```
上面的handler定义了一个名为`get`的trap，当对代理对象的属性进行访问的时候，这个trap就会被执行。上面的get函数中当被代理的对象上属性不存在的时候，返回默认值`default`，否则返回对应的属性值。

#### trap set
```javascript
let handler = {
    set(obj, prop, value, receiver){
        console.log(obj, prop, value, receiver);
        return Relfect.set(obj, prop, value, receiver);
    }
}

let p = new Proxy([], handler);
p[1] = 1;      
p.length = 5; 
```
在前面我们提到通过索引下标修改数组某项的值，或者修改length属性，不能被ES5中新增的Object.defineProperty()监听到，通过定义名为`set`的trap，执行这些操作的时候`set`都会被执行

#### trap has
```javascript
let target = {
    value: 42
}
let handler = {
    has(target, prop){
        if(prop === 'value'){
            return false;
        }else{
            return Reflect.has(target, prop);
        }
    }
}

let p = new Proxy(target, handler);
console.log('value' in p);      //false
console.log('toString' in p);   //true
```
当适用操作符`in`来判断属性是否在对象内存在时`has` trap被调用。

#### trap deleteProperty
```javascript
let target = {
    value: 42,
    name: 'micro'
}
let handler = {
    deleteProperty(trapTarget, prop){
        if(prop === 'value'){
            return false;
        }else{
            return Reflect.deleteProperty(target, prop);
        }
    }
}
let p = new Proxy(target, handler);

console.log(p.value);           //42
console.log(delete p.value);    //false
console.log(p.value);           //42

```
当通过操作符`delete`删除对象上某个属性的时候，`deleteProperty` trap被执行。
上面的例子当删除属性value的时候直接返回false。

#### trap prototype
```javascript
let p = new Proxy({}, {
    getPrototypeOf(target){
        return Reflect.getPrototypeOf(trapTarget);
    },
    setPrototypeOf(target, proto){
        return Reflect.setPrototypeOf(trapTarget, proto);
    }
})

let proxyProto = Object.getPrototypeOf(p);      //null
Object.setPrototypeOf(proxy, {});              //throw error
```

trap `getPrototypeOf(), setPrototypeOf()`分别在调用`Object.getPrototypeOf()`和`Object.setPrototype()`的时候被调用。

这里可能会有个疑问，为什么有了Object.getPrototypeOf()和Object.setPrototype()还要在Reflect上面定义getPrototypeOf(), setPrototypeOf()两个方法？
他们都是对javascript引擎内 [[GetPrototypeOf]] 和 [[SetPrototypeOf]] 操作的包装。不同的是Object.getPrototypeOf()和Object.setPrototype()会执行一些额外的操作造成在某些情况下两者返回的结果并不一样。

```javascript
let result1 = Object.getPrototypeOf(1);
console.log(result1 === Number.prototype);  // true

// throws an error
Reflect.getPrototypeOf(1);
```
当入参不是对象的时候，Object.getPrototypeOf()会将入参强制转换成为对象。

#### trap apply和construct
其他的trap，代理的目标对象都必须是函数，apply,construct则要求代理对象必须是一个函数。  


apply在函数没有通过关键字new调用的时候执行。
```javascript
let target = function() { return 42 },
    proxy = new Proxy(target, {
        apply: function(target, thisArg, argumentList) {
            return Reflect.apply(target, thisArg, argumentList);
        },
        construct: function(target, argumentList) {
            return Reflect.construct(target, argumentList);
        }
    });
```
apply接收三个参数：
* target - 代理的函数
* thisArg - 函数执行时内部的this
* argumentList - 函数调用时的参数


construct在通过new调用函数的时候执行，接收两个参数：
* target - 代理的函数
* argumentList - 参数列表
