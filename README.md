# vuetest
vue 2
apicloud studio 2

h5+app

npm run serve
npm run build

## sass
安装sass
```
npm install node-sass --save-dev
npm install sass-loader --save-dev

```

测试安装
- `App.vue` `style` 标签添加 `lang="scss"`
- 运行 `npm run serve`，正常则安装成功

基本用法 [SASS用法指南 - 阮一峰](https://ruanyifeng.com/blog/2012/06/sass.html)
```scss
// 变量
// SASS允许使用变量，所有变量以$开头。

$blue : #1875e7;　
div {
    color : $blue;
}

// 如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
$side : left;
.rounded {
    border-#{$side}-radius: 5px;
}

// 计算
　　body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}

//嵌套
　　div {
　　　　h1 {
　　　　　　color:red;
　　　　}
　　}

// 属性嵌套
// 比如border-color属性，可以写成
　　p {
　　　　border: { //注意，border后面必须加上冒号。
　　　　　　color: red;
　　　　}
　　}

// 引用父元素，比如a:hover伪类
　　a {
　　　　&:hover { color: #ffb3ff; }
　　}

// 继承
　　.class1 {
　　　　border: 1px solid #ddd;
　　}
// class2要继承class1，就要使用@extend命令：
　　.class2 {
　　　　@extend .class1;
　　　　font-size:120%;
　　}

// Mixin 重用的代码块
// @mixin命令，定义一个代码块
　　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}
// @include命令，调用这个mixin
　　div {
　　　　@include left;
　　}

//内置的颜色函数，以便生成系列颜色
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c

```

### 配置全局变量
安装依赖 sass-resources-loader
```
npm install sass-resources-loader --save-dev
```

添加vue.config.js
```javascript
module.exports = {
    // ...
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // 变量文件
                    resources: ['./src/assets/css/var.scss']
                })
                .end()
        })
    }
}
```