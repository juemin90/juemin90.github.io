又要开始学node.js了，为什么说又呢，因为已经是好几次尝试了。这次做项目需要用node.js和express，之前断断续续学的半懂不懂的东西，这次想好好组织一下，把这个项目的后端写的美美的。

#### Getting Started with Node

如果之前有做过静态HTML网页，或者有PHP或ASP开发经验，你可能会对web服务器如何为你提供静态文件有所了解。

既然已经装好了Node，那就开始从Hello world开始写代码吧。

在你最喜欢的编辑器中，创建一个helloWorld.js的文件。

```
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200,{'Content-Type'： 'text/plain'};
  res.end('Hello world!');
}).listen(3000);
console.log('Server started on localhost:3000, press Ctrl-C to terminate');
```

在终端里，进入helloWorld.js目录中，敲入node helloWorld.js，然后打开浏览器，进入http://localhost:3000，你的第一个页面及出现了。

#### 事件驱动

Node背后最核心的思想就是事件驱动编程，对于我们来说，发生了什么事件，并且要怎样的回复是很重要的事情。很多人都知道当用户点击页面的时候，我们就要做处理这个点击事件，是同样的道理。

在上述的例子中，事件不太容易察觉，这个事件是一个HTTP请求。http.createServer方法将一个函数作为参数，这个参数会在每一次http请求发生的时候被执行。

#### Routing

让我们扩展我们的Hello world例子，让它变得更有趣。让它拥有一个主页、一个About页面和404页面。

```javascript
var http = require('http');
http.createServer(function (req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch(path) {
    case '':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Homepage');
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About');
    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Not Found');
  }
}).listen(3000);
```

#### 提供静态资源

我们已经有了一个简单的能够工作的路由，那就创建几个HTML文件，它们被称为静态资源，因为他们不会变化。如果你用过Apache或IIS，那么你可能习惯创建HTML文件，然后在他们之间做跳转，它们会自动的送到浏览器那里。但是Node并不是这样，我们必须做打开文件、读文件和将它们的内容送到浏览器的工作。

我们现在创建一个叫public的文件夹，并且创建home.html, about.html, notfound.html等文件和img/logo.png。然后修改helloWorld.js文件

```
var http = require('http'),
  fs = require('fs');
function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode, {'Content-Type': contentType});
      res.end(data);
    }
  });
}
http.createServer(function (req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch(path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/img/logo/jpg':
      serveStaticFile(res, '/public/img/logo/jpg', 'image/jpeg');
      break;
    default:
      serveStaticFile(res, '/public/404.html', 'text/html');
      break;
  }
}).listen(3000);
```

#### Express

到现在为止，Node貌似并不是很有吸引力，开始Express。

Express从Ruby on Rails借鉴了脚手架的功能，自动生成每个项目共同必须的一些架构，但是在这里我们将不使用这个功能。

假设我们已经装好了express，创建一个meadowlark.js文件，这会是我们的项目的切入点。

```
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Internal Server Error');
});

// app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl + C to terminate');
});
```

现在你有了最简单的express服务器，你可以打开服务器，然后到localhost:3000：你也许会失望因为你没有提供任何路由给express，所以它会给你一个404页，告诉你这个页面并不存在。

现在就来加一些路由。

```
app.get('/'. function (req, res) {
  res.type('text/plain');
  res.send('Meadowlark Travel');
});
app.get('/about', function (req, res) {
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});
```

app.get方法是我们加路由的时候能够用到的。在Express文档中可以看到，app.VERB并不是说真的有一个叫VERT的方法，它只是一个http请求的占位符（比如get，post等）这个方法有两个参数，一个路径和一个回调方法。这个路径定义里路由，注意，在这里，大小写和是否忽略'/'都是无所谓的。第二个参数回调方法会在被触发。

在这里，我们将不使用node底层方法res.end方法，而是使用express封装的res.send方法，我们也用res.set和res.status方法替代res.writeHead方法。Express也提供了一些像能够设置Content-Type头的res.type方法。

要记住处理404和500要有一些不同，用app.use方法而不是app.get。app.use方法express用来使用middleware的，暂时先把它理解成所有没有被路由匹配的情况。还记得在上一章节中，我们手动的解析了url，抽取/并且将其变换成小写，而express自动地帮我们做了这些事情。

#### Views和Layouts

模板引擎我们使用handlebars,我们使用express3-handlebars包

```
npm install --save express3-handlebars
```

然后在meadowlark.js中，加入如下代码：

```
var app = express();
// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
```

它会生成一个视图引擎，并且设置express默认使用它。现在创建一个views文件夹和子文件夹layouts。

使用了模板引擎之后，我们再也不需要手动填写content type或状态码，视图引擎会返回text/html和200状态码。但是在404和500中，我们依然需要填写状态码。

#### 静态文件和视图

express使用中间件来处理静态文件和视图。static中间件能够帮助你加载html, css, js静态文件。在你的项目里，创建一个子目录叫public，然后在路由之前，加上static中间件

```
app.use(express.static(__dirname + '/public'));
```

#### URL的组成部分

protocol：协议界定了请求会以什么样的方式被传播，最常见的有http和https，另外还有file和ftp等。

Host：Host会识别服务器。

Port：每个服务器都有一些端口，一些端口号是很特别的，例如80或443，如果省略端口，80会是http请求的端口，443是https请求的端口。当自己指定一个端口的时候，端口号要大于1023.

Path：服务器中的路径

QueryString：是一些key-value对，它以？开始，键值对以&分割开来。key和value都要被URL encoded。JavaScript提供了encodeURIComponent方法。

Fragment

Fragment或者Hash不会被传入服务器中，它只是会被浏览器所识别。它在单页面应用中使用的比较广泛。

