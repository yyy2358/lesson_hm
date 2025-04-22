# 在 React 开发里，export default 常用来导出组件。例如：
` `import React from 'react';

// 导出默认组件
export default function MyComponent() {
    return <h1>这是一个 React 组件</h1>;
}
其他文件导入这个组件时可以这样写：

import React from 'react';
import MyComponent from './MyComponent.js';

function App() {
    return (
        <div>
            <MyComponent />
        </div>
    );
}

export default App;
` `
在浏览器环境里使用了 export 关键字，而浏览器默认并不支持 CommonJS 模块系统，exports 是 CommonJS 模块规范里的对象，浏览器环境没有定义它。

在你的代码里，export default function ShoppingList() 这行代码导致了该错误，因为浏览器环境不认识 export 语法。由于你是在 HTML 文件里直接使用 React，不需要导出组件，直接定义函数即可


# 在浏览器中使用 Babel 转换器会带来一些性能问题：
解决方案：
- 加载速度慢：浏览器需要先下载 Babel 库，再实时将 JSX 或其他高级 JavaScript 语法转换为浏览器能理解的代码，这会增加页面加载时间。
- 资源消耗大：实时转换代码会占用浏览器的 CPU 资源，尤其是在处理复杂代码时，可能导致页面卡顿。

1. 使用 Create React App
Create React App 是一个官方提供的快速搭建 React 应用的工具，它已经配置好了 Babel 等构建工具。

步骤如下：

确保你已经安装了 Node.js 和 npm。
在项目根目录下执行以下命令创建新的 React 项目：

bash
npx create-react-app .
将你当前 index.html 里的 React 组件代码迁移到 src 目录下的 App.js 文件中。


# JSX
在 JSX 里，自定义组件可以像 HTML 标签一样使用。当 React 遇到自定义组件标签时，会把这个标签解析为对应的组件函数或类，并调用它们来生成对应的虚拟 DOM 元素。


- useState 是 React 的一个钩子函数，它用于在函数式组件里添加状态。钩子函数只能在函数式组件或自定义钩子中使用。

- useState(0) 初始化了一个状态变量 count，初始值为 0。useState 返回一个数组，数组的第一个元素是状态变量 count，第二个元素是用于更新该状态的函数 setCount。

- 这个错误 Uncaught ReferenceError: useState is not defined 表明在代码里使用了 useState，但 JavaScript 引擎找不到这个变量。在 React 里，useState 是一个钩子函数，需要从 react 库导入。由于你是通过 CDN 引入 React，不能使用 import 语句，需要通过 React.useState 来访问。

# 按钮
- 每个按钮都有其自己的 独立 ，单击每个按钮时，只有单击的按钮的 会更改
- 您通常需要组件来共享数据并始终一起更新。

要使两个组件显示相同并一起更新，您需要将状态从各个按钮“向上”移动到包含所有按钮的最近组件。

# prop
- 在 React 里，prop（全称为 properties，属性）是一种用于在组件之间传递数据的机制。它允许你将数据从父组件传递到子组件，让子组件可以根据这些数据来渲染不同的内容或者执行不同的逻辑。

# 组件数据共享
-  在 React 里，状态提升是实现组件间数据共享的常用方法，父组件可以将状态和更新状态的函数作为 props 传递给子组件。

# counter2.html 代码解释
- 状态提升：把 count 状态从 Mybutton 组件移到 Myapp 组件中，这样 Myapp 就可以管理这个共享的点击次数。
- 定义更新函数：在 Myapp 组件里定义 handleClick 函数，用于更新 count 状态。
- 传递 props：Myapp 组件将 count 和 handleClick 作为 props 传递给两个 Mybutton 组件。
- 子组件使用 props：Mybutton 组件接收 count 和 onClick 这两个 props，并将 onClick 绑定到按钮的 onClick 事件上，同时显示 count 的值。


掘金写文章，react一 。。。。加入幽默，标题吸引人
coze ai应用，marscode训练营

先快速看一下文档，然后结合网课写文章，每篇讲知识点然后给出题目

next.js