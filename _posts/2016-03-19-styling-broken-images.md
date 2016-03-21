---
layout: default
title: 이미지 로딩 실패시 스타일링
theme: JavaScript
---

#### 깨진 그림은 아름답지 못합니다.

![This image is broken! Ugly, isn't it?](asdfasdf)

하지만 우리는 css를 이용하여 img엘리먼트를 보기 좋게 만들 수 있습니다.

##### img엘리먼트에 관한 두가지 사실

깨진 그림을 스타일링 하는것을 이해하기 위해서 우리가 알아야 할 img엘리먼트에 관한 두가지 사실을 말해보려고 합니다.

> * img엘리먼트에 정상적인 css규칙을 적용할 수 있습니다. 이러한 스타일링 규칙들은 alternative text에 적용 될 수 있으며, 만약에 그림이 정상적으로 로딩 되었다면 페이지 구성에 영향을 주지 않게 됩니다.
> * img엘리먼트는 대체된 엘리먼트 입니다. img엘리먼트는 "겉모습과 차원이 외부 리소스에 인하여 결정되는 엘리먼트"입니다. 그렇기 때문에 :before와 :after같은 수도 클라스는 일반적으로 작동하지 않게 됩니다. 하지만 이미지가 깨지거나 로드되지 않았을 때에는 이런 수도 엘리먼트들은 나타나게 됩니다.

이러한 두가지 사실 때문에 우리는 이미지가 깨졌을 상황에 스타일링을 가능하게 할 수 있습니다.

실제 코드로 보여드리도록 하겠습니다.

아래와 같은 이미지 엘리먼트가 있다고 가정합니다.

```html
<img src="http://bitsofco.de/broken.jpg" alt="Kanye Laughint">
```

##### 에러메시지 추가하기

에러 메시지를 사용자에게 보여주는것도 한가지 방법이 될 수 있습니다, 이미지가 정상적으로 로드 되지 않았으니 제공 된 이미지 주소를 방문하여 주시기 바랍니다 와 같은 문구를 말입니다.

![error message](http://bitsofco.de/content/images/2016/02/Screen-Shot-2016-02-27-at-12-41-36.png)

```scss
img {
      font-family: 'Helvetica';
      font-weight: 300;
      line-height: 2;
      text-align: center;
      width: 100%;
      height: auto;
      display: block;
      position: relative;

      &:before {
        content: "We're sorry, the image below is broken :(";
        display: block;
        margin-bottom: 10px;
      }
      &:after {
        content: "(url: " attr(src) ")";
        display: block;
        font-size: 12px;
      }
    }
```

##### alternative text의 디폴트 값을 대체하기

다른 방식으로, 우리는 수도 엘리먼트를 사용하여 alt text의 디폴트 값을 대체할 수 있습니다. 수도엘리먼트를 디폴트 텍스트 맨 위에 놓아 디폴트 텍스트를 보이지 않게 말입니다.

![replace default value](http://bitsofco.de/content/images/2016/02/Screen-Shot-2016-02-27-at-12-41-45-1.png)

```scss
img {
      /* same as first example */
      &:after {
        content: "\f1c5" " " attr(alt);

        font-size: 16px;
        font-family: FontAwesome;
        color: rgb(100, 100, 100);

        display: block;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
    }
```

##### 또 다른 스타일링 방식

지정 된 메시지를 사용자에게 보여주기 위해 수도 엘리먼트를 사용하여 깨진 이미지를 스타일링 할 수 있습니다.

![extra styling](http://bitsofco.de/content/images/2016/02/Screen-Shot-2016-02-27-at-12-41-54.png)

```scss
img {
      /* Same as first example */
      min-height: 50px;
      &:before {
        content: " ";
        display: block;
        position: absolute;
        top: -10px;
        left: 0;
        height: calc(100% + 10px);
        width: 100%;
        background-color: rgb(230, 230, 230);
        border: 2px dotted rgb(200, 200, 200);
        border-radius: 5px;
      }
      &:after {
        content: "\f127" " Broken Image of " attr(alt);
        display: block;
        font-size: 16px;
        font-style: normal;
        font-family: FontAwesome;
        color: rgb(100, 100, 100);

        position: absolute;
        top: 5px;
        left: 0;
        width: 100%;
        text-align: center;
      }
    }
```

이미지가 정상적으로 로딩 되었다면, 모든 엘리먼트에 같은 스탕일링 룰이 적용되며, 정상적으로 보여지게 됩니다. 수도 엘리먼트들은 아예 생성되지도 않습니다.

#####브라우저 호환성

안타까운 점은, 모든 브라우저에서 같은 모습으로 보여지지 않는 다는 점입니다. 아래 테이블은 호환성 테스트 결과를 보여줍니다.

|               Browser                | AltText | :before | :after |
| :----------------------------------: | :-----: | :-----: | :----: |
|     Chrome(Desktop and Android)      |    1    |    1    |   1    |
|     Firefox(Desktop and Android)     |    1    |    1    |   1    |
|            Opera(Desktop)            |    1    |    1    |   1    |
|              Opera Mini              |   1**   |    0    |   0    |
|       Safari(Desktop and iOS)        |   1*    |    0    |   0    |
| iOS Webview(Chrome, Firefox, others) |   1*    |    0    |   0    |

*alt텍스트는 이미지의 넓이가 어느 정도 될 때만이 나타나게 됩니다. 이미지의 넓이가 지정되지 않았다면 alt텍스트는 나타나지 않게 됩니다.

**폰트 스타일링 룰이 적용되지 않습니다.

수도 클라스가 지원 되지 않는 브라우저에서는 스타일링 룰 들이 적용되지 않습니다.