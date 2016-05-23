---
layout: default
title: 有关Promise
theme: JavaScript
---

去年六月份，ES2015正式发布（也就是ES6），其中Promise被列为正式规范。作为ES6中最重要的特性之一，我们有必要掌握并理解透彻。

复杂的概念先不讲，我们先简单粗暴地把Promise用一下，有个直观感受。那么第一个问题来了，Promise是什么玩意呢？是一个类？对象？数组？函数？

别猜了，直接打印出来看看吧。

```javascript
console.dir(Promise)
```

![promise](http://mmbiz.qpic.cn/mmbiz/zPh0erYjkib0In4GI5qAQJR4yOnveEa5VrXNmILo6dmTwX8D8mZRj9RMib0WLv7SmbDPWpPr78qx0edv0qxUiaHaw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

<p><img src="http://mmbiz.qpic.cn/mmbiz/zPh0erYjkib0In4GI5qAQJR4yOnveEa5VrXNmILo6dmTwX8D8mZRj9RMib0WLv7SmbDPWpPr78qx0edv0qxUiaHaw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" alt="promise" /></p>

这么一看就明白了，Promise是一个构造函数，自己身上有all, reject, resolve这几个眼熟的方法，源性上有then, catch等同样很眼熟的方法。这么说用Promise new出来的对象肯定就有then, catch等方法了。

那就new一个玩玩吧。

``` javascript
var p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log('执行完成');
    resolve('随便什么数据');
  }, 2000);
});
```

Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve, reject。分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

其实这里用成功和失败来描述并不准确，按照标准来讲，resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejcted。不过在我们开始阶段可以先这么理解，后面再细究概念。

在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出"执行完成"，并且调用resolve方法。

运行代码，会在2秒后输出"执行完成"。注意！我只是new了一个对象，并没有调用它，我们传进去的函数就已经执行了，这是需要注意的一个细节。所以我们用Promise的时候一般是包在一个函数中，在需要的时候运行这个函数，如：
``` javascript
function runAsync() {
      var p = new Promise(function (resolve, reject) {
        setTimeout(function () {
          console.log('执行完成');
          resolve('随便什么数据');
        });
      });
    }
    runAsync();
```

这时候你应该有两个疑问：1.包装这么一个函数有毛线用？2.resolve('随便什么数据');这是干毛的？

我们继续来说。在我们包装好的函数最后，会return出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。还记得Promise对象上有then, catch方法吧？这就是强大之处了，看下面的代码：
``` javascript
runAsync().then(function (data) {
  console.log(data);
});
```

在runAsync()的返回上直接调用then方法，then接收一个参数，是函数，并且会拿到我们在runAsync中调用resolve时传的参数。运行这段代码，会在2秒后输出"执行完成"，紧接着输出"随便什么数据"。

这时候你应该有所领悟了，原来then里面的函数就跟我们平时的回调函数一个意思，能够在runAsync这个异步任务执行完成之后被执行。这就是Promise的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完成后，用链式调用的方式执行回调函数。

你可能会不屑一顾，那么牛逼轰轰的Promise就这点能耐？我把回调函数封装一下，给runAsync传进去不也一样吗，就像这样：
``` javascript
function runAsync(callback) {
  setTimeout(function () {
    console.log('执行完成');
    callback('随便什么数据');
  });
}
runAsync(function (data) {
  console.log(data);
});
```

效果也是一样的，还费劲用Promise干嘛。那么问题来了，有多层回调该怎么办？如果callback也是一个异步操作，而且执行完后也需要有相应的回调函数，该怎么办呢？

总不能再定义一个callback2，然后给callback传进去吧。而Promise得优势在于，可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作。

#### 链式操作的用法

所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是"状态"，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的。
``` javascript
runAsync1()
.then(function (data) {
  console.log(data);
  return runAsync2();
})
.then(function (data) {
  console.log(data);
  return runAsync3();
})
.then(function (data) {
  console.log(data);
});
```









