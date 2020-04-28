---
title: HTML5之MutationObserver
date: 2020-04-28T01:36:16.523Z
description: >-
  MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3
  Events规范的一部分。
tags:
  - HTML5
categories:
  - 编码
template: post
---
我们在调试代码的时候，会遇到这种情况，DOM被代码修改了，但是找不到是被哪些代码修改，我们可以在浏览器开工工具栏找到DOM元素，通过打DOM断点的方式，DOM被修改的时候会暂停执行，然后根据调用堆栈找到修改DOM元素的代码。
通过`MutationObserver`这个API可以监听DOM变化，当DOM发生变化的时候执行回调。

## 语法
`var observer = new MutationObserver(callback)`
接收一个回调函数，被指定的节点，子树，或者属性修改的时候会被调用，回调函数有两个参数，一个是所有被触发改动的`MutationRecord`对象数组，另一个是调用该函数的`MutationObserver`对象，构造方法返回一个`MutationObserver`对象，具有下列方法：  

**observe()**  
设置观察目标，接收两个参数，target：观察目标，options：观察选项。 options为一个js对象，可以有如下属性：
* childList 设置为true,表示监听目标子节点的变化，比如添加或删除
* attributes 表示监听目标的属性变化
* characterData 监听目标的数据变化，即text节点
* characterDataOldValue 记录text节点先前的值
* subtree 监听目标及目标的所有后代
* attributeFilter 数组，监听的属性集合
* attributeOldValue 记录改动属性的上一个值

**disconnect()**  
停止观察,停用之后可以调用observe()重复监听  
**takeRecords()**  
从MutationObserver的通知队列中删除所有待处理的通知，并返回。



下面是[MoZilla.rog](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)中的一个例子
```
// Select the node that will be observed for mutations
var targetNode = document.getElementById('some-id');

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();

// ES-next version

// Select the node that will be observed for mutations
let targetNode = document.querySelector(`#id`);

// Options for the observer (which mutations to observe)
let config = {
    attributes: true,
    childList: true,
    subtree: true
};

// Callback function to execute when mutations are observed
const mutationCallback = (mutationsList) => {
    for(let mutation of mutationsList) {
        let type = mutation.type;
        switch (type) {
            case "childList":
                console.log("A child node has been added or removed.");
                break;
            case "attributes":
                console.log(`The ${mutation.attributeName} attribute was modified.`);
                break;
            case "subtree":
                console.log(`The subtree was modified.`);
                break;
            default:
                break;
        }
    }
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();


```

