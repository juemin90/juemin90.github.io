---
layout: default
title: 隐藏滚动条的方法
theme: CSS
---

### 隐藏滚动条的方法

```English
Mama says life is a box of chocolate, you never know what you are gonna get.
```

同理，你也不知道你下一个需求是什么。

现在有一个需求，一段高度(宽度即可)有限的div里，有着较多的内容，又要可以滚动，又不想显示滚动条。

很容易想到CSS里的一个属性，代码如下：

```css
#element::-webkit-scrollbar {
  display: none;
}
```

或者

```css
#element::-webkit-scrollbar {
  height: 0;
  width: 0;
}
```

这样就把滚动条给隐藏掉了，chrome亲测可用。

OK，chrome可以了，那就按照惯例，把前缀改一下，兼容FF, Safari, Opera等？(IE滚粗)

```css
#element::-moz-scrollbar {
  display: none;
}
#element::-o-scrollbar {
  display: none;
}
```

开开心心的打开firefox，What the fuck.

原来这个属性只适用于webkit内核的浏览器。如果想兼容其他浏览器，那就要想别的方法了。

- 最简单的方法，就是手动隐藏

```html
<div class="wrapper">
  <div class="inner">
  </div>
</div>
```

在这里，inner是包含内容的div，也就是需要滚动的div，我们给它包上了一层类名为wrapper的div。

```scss
.wrapper {
  overflow-x: hidden;
  .inner {
    margin-right: -18px;
    padding-right: 18px;
    height: 100px;
    overflow: auto;
  }
}
```

这样，把.inner的元素向右扩展了18px，也就是scrollbar的宽度。因为.wrapper元素的横向溢出会被隐藏掉，就把滚动条给遮住了。然后.inner的padding-right设置为18px，.inner元素里面的样子就变得自然了一些。

虽然可行，但是有点二。

- 用宽度小20px的父元素包住

html代码和第一个方法中一样。

```scss
.wrapper {
  overflow: hidden;
  width: 150px;
  .inner {
    width: 170px;
    height: 100px;
    overflow: auto;
  }
}
```

可以在[jsFiddle](http://jsfiddle.net/qqPcb/)看。

其实原理是差不多的，感觉这个方法会少一些hack的成分。