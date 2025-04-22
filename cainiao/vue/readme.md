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