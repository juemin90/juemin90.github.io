---
layout: default

title: Node+Express做一个web应用

theme: coding
---

用按钮`<button>`还是链接`<a>`？分析一下各自的特点。

翻译自[原文](https://marcysutton.com/links-vs-buttons-in-modern-web-applications/)

##### Buttons

很多人对`<button>`这个元素的功能有多么强大，它能做如下的事情：

- 默认获取键盘事件
- 能够用空格键来点击
- 提交表单到服务器
- 重置一个表单
- 能够通过`disabled`属性来使之不可点击
- 能够让屏幕阅读器阅读到按钮的职责
- 使用`:focus`，`:hover`， `:active`，`:disabled`等伪类

通过写一些脚本，按钮也可以完美执行如下的功能

- 打开一个modal
- 触发一个popup
- 切换界面
- 播放媒体内容



##### Links

link的属性如下，link也被称为锚(anchors)

- 建立一个超链接
- 引导用户到新的页面或者视图
- 变换url
- 触发浏览器的重绘/刷新事件
- 和href属性配合，支持页面跳转
- Deep-link client-rendered applications（怎么翻译）？
- 用href和#hash可以自动定位到特定位置
- Register a click with the Enter key
- Have the implicit `link` role
- 不可以和`button`一样被disable，但是可以用`tabindex="-1"`和`aria-hidden="true"`来对屏幕阅读更友好
- 可以在新页面打开
- 使用`:focus`，`:hover`， `:active`，`:disabled`等伪类

简单粗暴的说，link和button最本质的区别就是：link能引导用户从当前的内容到一个新的资源，button能在界面中做一些切换，比如播放视频或在同一个上下文中触发一些事件。