-  通过node.js创建一个vue应用    要输入的命令
-  也可以直接通过 CDN 来使用 Vue  即使用全局构建版本 

- 逐步深入，我们可能需要将代码分割成单独的 JavaScript 文件，以便更容易管理。
- 如果直接在浏览器中打开了上面的 index.html，你会发现它抛出了一个错误，因为 ES 模块不能通过 file:// 协议工作，也即是当你打开一个本地文件时浏览器使用的协议。
- 你可以使用一个简单的 HTTP 服务器来运行项目。以下是具体步骤：


bash
# 在项目目录下运行这个命令
npx http-server .




这个错误是因为你在使用 ES 模块的 import 语法时，模块路径没有正确指定。在浏览器环境中，直接使用 import { createApp } from 'vue' 是不被允许的，因为浏览器无法解析这种裸模块说明符。

你有两种解决方案：

方案 1：使用 CDN 的 ES 模块版本
修改你的 index.html 文件：


index.html
Apply
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
方案 2：使用全局构建版本
修改你的 index.html 文件：


index.html
Apply
<script>
  const { createApp } = Vue
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>


# setup() 函数

这是 Vue 3 组合式 API 的核心
在这里定义组件逻辑
返回的对象中的属性可以在模板中使用


# DOM
（文档对象模型，Document Object Model）是HTML和XML文档的编程接口。它提供了对文档的结构化表示，

- 在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 XSS 漏洞。请仅在内容安全可信时再使用 v-html，并且永远不要使用用户提供的 HTML 内容。

<div id="container" class="wrapper" style="background-color:green"></div>
=><div v-bind="objectOfAttrs"></div>

{{ message.split('').reverse().join('') }}
这个表达式会对 message 数据属性的值进行反转操作。message 是 Vue 实例或组件中定义的字符串类型的数据属性。split('') 方法将字符串拆分为字符数组，reverse() 方法将数组元素顺序反转，join('') 方法再把反转后的数组元素拼接成字符串。

<div :id="`list-${id}`"></div>
动态绑定表达式的结果会被作为字符串使用，所以 id 的值会变成 "list-xxx"。
表达式不同于  语句


-  v-on 指令，它将监听 DOM 事件：
<a v-on:click="doSomething"> ... </a>
<!-- 简写 -->
<a @click="doSomething"> ... </a>
这里的参数是要监听的事件名称：click。v-on 有一个相应的缩写，即 @ 字符。

- template 是 Vue 组件的一个选项，用于定义组件的 HTML 结构。它描述了组件在页面上的呈现形式，能结合 Vue 的指令和插值表达式实现动态内容渲染与交互逻辑。

<form @submit.prevent="onSubmit">...</form>
- @submit 是 v-on:submit 的简写形式，v-on 是 Vue 中的指令，用于监听 DOM 事件。submit 是表单元素特有的事件，当用户点击表单中的提交按钮（<input type="submit"> 或 <button type="submit">）时会触发该事件。
- .prevent
.prevent 是 Vue 事件修饰符，它的作用是调用 event.preventDefault() 方法，阻止表单提交时的默认行为。在 HTML 中，表单提交的默认行为是向服务器发送请求并刷新页面，使用 .prevent 修饰符可以阻止这种默认行为，从而可以在前端使用 JavaScript 来处理表单数据。

# ref
注意，在模板中使用 ref 时，我们不需要附加 .value。为了方便起见，当在模板中使用时，ref 会自动解包

# createApp() 函数
createApp 函数定义在 vue 模块中，你可以使用它来创建应用实例，并且将组件挂载到 DOM 元素上。

createApp API 允许你在同一个页面中创建多个共存的 Vue 应用，而且每个应用都拥有自己的用于配置和全局资源的作用域。
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')

# async  await

# 响应式系统
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 创建一个空的响应式代理对象 proxy
const proxy = reactive({});
// 创建一个普通的空对象 raw
const raw = {};
// 将普通对象 raw 赋值给代理对象 proxy 的 nested 属性
proxy.nested = raw;
// 比较 proxy.nested 和 raw 是否相等
console.log(proxy.nested === raw) // false

- 结果为 false 的原因
当你将 raw 对象赋值给 proxy 的 nested 属性时，Vue 的响应式系统会对 raw 进行深层的响应式处理，将其转换为一个新的代理对象。因此，proxy.nested 实际上是 raw 的一个响应式代理，而不是 raw 本身，所以 proxy.nested === raw 的结果为 false。

- 当 ref 被嵌套在 reactive 对象中时，会自动解包，即访问 state.count 时实际上访问的是 count.value。

- 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
这意味着在模板中使用 ref 时，无需附加 .value，为开发提供了便利。
在下面的例子中，count 和 object 是顶级属性，但 object.id 不是

为了解决这个问题，我们可以将 id 解构为一个顶级属性：
const { id } = object
template
{{ id + 1 }}：