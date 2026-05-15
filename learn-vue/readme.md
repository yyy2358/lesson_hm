## 类与样式绑定
- :style="[对象1, 对象2]"
把多个样式对象合并成一个内联样式
对象 2 的样式 会覆盖 对象 1 中同名的样式
- 单根组件：子组件模板里 只有 1 个标签
- 多根组件：子组件模板里 有 2 个及以上标签
- 父组件给子组件写的所有 class，会自动合并到子组件的根标签上
- 多根组件（必须手动指定，用 $attrs.class）
- $attrs：Vue 自带的工具，专门存父组件传给子组件的属性（比如 class、id、title 等）
<!-- - 子组件 -->
- <p :class="$attrs.class">Hi</p>
  <span>This is a child component</span>
<!-- - 父组件 -->
- <MyComponent class="baz" />

- { [变量名]: 另一个变量 } 这是 ES6 语法：用变量当对象的键   满足条件就加类，不满足就不加
- 数组加对象写法：<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
- 比三元表达式更简洁<div :class="[isActive ? activeClass : '', errorClass]"></div>
- ?. 叫做 可选链操作符，作用是当对象为 null 或 undefined 时，表达式短路返回 undefined，而不是抛出错误
= 安全地读取 error.value 里的 type 属性
= 就算没有值，也不会让代码报错崩溃

## 条件渲染
- 满足条件才创建 DOM 元素，不满足就销毁 / 不渲染。
- v-if="条件变量/表达式" 只有表达式为真，才渲染元素
- v-else 作用：v-if 的 “否则”，必须紧跟在 v-if 后面   不能单独使用，不能中间隔其他元素
- <h1 v-if="awesome">Vue is awesome!</h1>
<!-- awesome 为 false 时渲染 -->
<h1 v-else>Oh no 😢</h1> 
<!-- 两个标题只会显示一个，另一个直接从 DOM 中移除。 -->
- v-else-if 多条件分支   作用：多条件判断，可以链式使用    必须紧跟在 v-if / v-else-if 后面
- <div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<!-- 以上都不满足时渲染 -->
<div v-else>Not A/B/C</div>
- v-if必须绑定在单个元素上，想同时控制多个元素的显示隐藏，可以把它们包裹在一个 <template> 标签里  特点：最终页面不会渲染出 <template> 标签
<template v-if="ok">
  <!-- 这三个元素会一起显示/隐藏 -->
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
- v-show：条件显示元素，和 v-if 外观效果一样，但底层逻辑完全不同。
核心特点：1.元素始终会被渲染到 DOM 中2.只是通过 CSS display: none 隐藏 / 显示3.不支持 <template>4.不支持 v-else /v-else-if
- 频繁切换用 v-show，不怎么变用 v-if。比如点击切换适合用v-show <button @click="awesome = !awesome">切换</button>
<h1 v-show="awesome">Vue 太棒了！</h1>
- 绝对不要把 v-if 和 v-for 用在同一个元素上！
优先级：v-if 会先执行，容易造成逻辑错误、性能问题

## v-for列表渲染
- 1.遍历数组 带索引
父作用域 = 循环外面的大区域
子作用域 = v-for 循环里面的小区域
父作用域的变量 → 子作用域（循环内部）可以随便用
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
- item：循环的每一项（自定义别名   格式固定：(项, 索引) in 数组
2. 解构遍历 & of 替代 in 功能一样 只是更接近js语法
<li v-for="{ message }
 in items">{{ message }}</li> 
 <li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li> 解构加索引一起用 不用写item
3.遍历对象
const myObject = reactive({
  title: 'Vue教程',
  author: '张三'
})
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
值+键+索引
4. v-for 和 v-if 不能同标签，用 template 分开
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
遍历所有待办事项，只在页面上显示「未完成」的待办事项名字
5.循环组件要手动传 props
6.过滤 / 排序用计算属性，不要直接修改原数组
const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
7.v-for 嵌套循环
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
先外层循环 拿到第一个大对象{message:"我是第一项", children: ['a', 'b', 'c']}
再内层循环依次拿到a、b、c
8.v-for 遍历整数 <span v-for="n in 10">{{ n }}</span>
9.v-for 配合 <template>（隐形容器）一次性循环两个或多个循环<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>//分割线
  </template>
</ul>
10.必须加key属性 所有v-for列表 给循环的每一项绑定一个唯一的标识
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
11.v-for 渲染组件
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>Vue 组件是「封闭的小房间」，循环里的 item 进不去！必须手动用 :item="item" 把数据「扔进去」  props
组件作用域独立
12.数组变更检测（Vue 能监听的数组方法）
1. 变异方法（调用这些方法修改数组，页面会自动刷新更新视图）
push() 末尾添加
pop() 末尾删除
shift() 开头删除
unshift() 开头添加
splice() 截取 / 替换
sort() 排序
reverse() 反转
2.非变异方法(返回新数组)必须重新赋值才能更新视图
items.value = items.value.filter((item) => item.message.match(/Foo/))只保留message包含foo的项，返回新数组，再赋值给 items.value，页面才会更新
filter () → 过滤 / 筛选
遍历数组，只留下符合条件的元素，返回新数组
concat () → 拼接数组
把多个数组合并成一个新数组，const arr1 = [1,2]const arr2 = [3,4] // 拼接两个数组
const newArr = arr1.concat(arr2)
- vue中用法
const items = ref([1,2])
// 拼接新数据，必须重新赋值
items.value = items.value.concat([3,4])
// 最终：[1,2,3,4]

slice () → 截取数组
从原数组中切出一段，返回截取的新数组，不修改原数组
数组.slice(起始索引, 结束索引)
包前不包后（包含起始，不包含结束）

Vue 常用：复制数组   不传参数
js
const items = ref([1,2,3])
// 完整复制数组
items.value = items.value.slice()

13.嵌套循环用方法  计算属性不能用在嵌套循环里 可以用方法处理
js
// 1. 定义响应式数据
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])
// 2. 定义一个筛选偶数的函数
function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
vue:<!-- 3. 模板嵌套循环 -->
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
外层循环:第 1 次：numbers = [1,2,3,4,5]
第 2 次：numbers = [6,7,8,9,10]
内层函数:把当前的 numbers 传给 even() 函数
第一次 even (numbers) → 得到 [2,4]
第二次 even (numbers) → 得到 [6,8,10]
14.sort /reverse 注意点
js
// 错误
return numbers.reverse()  会改变原数组的顺序
// 正确
return [...numbers].reverse()
解释
reverse() / sort() 会改变原数组
必须先拷贝 [...numbers] 再操作

[...numbers] = 快速复制一个一模一样的新数组
es6 语法：展开运算符（Spread Operator）

## 事件处理
- 监听事件
使用 v-on 监听 DOM 事件，简写为 @
v-on:click="handler"  @click="handler"（监听点击事件）
- 模板字符串（简洁，用反引号 `` 包裹）
${} = JS 原生的变量插入语法
- 原生DOM事件 浏览器自带的事件对象，包含点击 / 触发元素等信息。 
event.target：浏览器告诉你，是哪个元素触发的事件
tagName：浏览器告诉你，这个元素的标签名

- 内联箭头函数 传自定义参数 + 原生事件
jS 原生箭头函数 + Vue 内联事件支持写 JS 代码。
(event)：箭头函数的参数 → 手动接收浏览器的原生 DOM 事件
=>：JS 箭头函数的固定符号
warn(...)：在箭头函数里，调用我们的方法，把自定义参数和event都传进去
<button @click="(event) => warn('Form cannot be submitted yet.', event)">Submit</button>

 Vue 规定的「内置特殊变量标记」
Vue 自带的、给你用的内置变量：
比如代表原生事件的 $event → 必须加 $
<!-- 自定义参数 + $event（原生事件）-->
<button @click="warn('提示文字', $event)">Submit</button>
preventDefault() 作用：阻止浏览器的默认行为（刷新、跳转、提交等）；
你的代码里用它：点击提交按钮时，只弹提示，不让页面刷新 / 提交；

## 事件修饰符
<!-- 阻止冒泡 -->子元素触发事件 → 事件自动向上传给父元素、祖先元素，一层层触发
<a @click.stop="doThis"></a>
<!-- 阻止表单提交默认行为 -->
<form @submit.prevent="onSubmit"></form>
<!-- 修饰符链式调用（顺序很重要！先阻止冒泡，再阻止默认） -->
<a @click.stop.prevent="doThat"></a>
<!-- 仅点击元素自身时触发（子元素点击不触发） -->
<div @click.self="doThat">...</div>
<!-- 捕获模式：内层元素事件先在外层处理 -->
<div @click.capture="doThis">...</div>
<!-- 点击只触发一次 -->
<a @click.once="doThis"></a>
<!-- 滚动事件默认行为立即执行（不等待 onScroll 完成） -->
<div @scroll.passive="onScroll">...</div>
修饰符顺序会影响效果！如 @click.prevent.self 会阻止元素自身和子元素的默认行为，而 @click.self.prevent 仅阻止元素自身的默认行为。

## 按键修饰符
用于监听键盘事件时指定按键，格式为 @keyup.按键名
<!-- 仅在按下 Enter 键时触发 submit -->
<input @keyup.enter="submit" />
##系统修饰键##
用于监听需同时按下修饰键的场景（如 Ctrl+Click），修饰键包括：
.ctrl、.alt、.shift、.meta
<!-- Alt + Enter 时触发 clear -->
<input @keyup.alt.enter="clear" />
<!-- Ctrl + 点击时触发 doSomething -->
<div @click.ctrl="doSomething">Do something</div>

- .exact 修饰符：要求同时满足所有指定的修饰键
<!-- 即使同时按 Alt/Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>
<!-- 仅按 Ctrl（无其他修饰键）时触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 不按任何修饰键时触发 -->
<button @click.exact="onClick">A</button>

## 表单输入绑定(v-model)
- v-model核心概念:简化表单元素与 JavaScript 状态的双向绑定，自动处理值同步和事件监听。
手动绑定的原始写法（以文本输入为例）：
<input
  :value="text"           <!-- 单向绑定：JS状态 → 输入框值 -->同步给输入框的显示内容
  @input="event => text = event.target.value"  <!-- 监听输入：输入框值 → JS状态 -->
>
用户在输入框打字 → 立刻把输入的内容，同步给 JS 里的 text 变量。
<input v-model="text">  <!-- 等价于上面的手动绑定 -->简化写法

- v-model 会忽略表单元素的初始 value、checked、selected 属性，始终以 JavaScript 中的响应式状态作为数据来源。初始值需在 JS 中通过 ref 等响应式 API 声明。
- white-space: pre-line; = 让文本里的换行生效，正常显示多行文字，专门配合 <textarea> 多行输入使用
- <label> = 表单元素的文字说明
for = 连接标签和表单元素的桥梁（值 = 对应元素的 id）
你不用点小小的复选框，点击标签里的文字，就能直接选中 / 取消复选框！
这就是 for 属性的意义 ——扩大点击区域，方便用户操作。
- 单个复选框的 v-model，默认绑定的就是布尔值 true/false   js里初始了const checked=ref(false)  你点击勾选复选框：v-model 自动监听到 change 事件把 JS 变量 checked 的值改成 true Vue 自动刷新页面 → 标签显示 true

- <div>Selected: {{ selected }}</div>
<select v-model="selected" multiple>   <!-- 多选要加上 multiple 属性 且v-model绑定数组  单选不加 -->
  <option disabled value="">Please select one</option>  <!-- 建议添加空值禁用项，兼容 iOS --><option>A</option><option>B</option><option>C</option>
</select>
解释：按住 Ctrl/Cmd 多选，选中的值会存入 selected 数组。
（3）动态渲染选项（配合 v-for）
js
const selected = ref('A')
const options = ref([  // 动态选项数据
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
html
预览
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option v-for="option in options" :value="option.value"> 
   <!-- 遍历 options 生成选项      给下拉选项设置「代码用的真实值」，让 v-model 精准拿到我们需要的数据，而不是页面显示的文字！ -->
    {{ option.text }}  <!-- 显示的文本 -->
  </option>
</select>

## 值绑定 
- 默认情况下，v-model 绑定的是静态字符串或布尔值。如需绑定动态值或非字符串值，需配合 v-bind（简写 :）。
- 单选框 <input type="radio" v-model="pick" :value="first" />
- 复选框    true-value不是原生 HTML 属性！
它是 Vue 专门给 复选框 (checkbox) 定制的专属属性，只有配合 v-model 才能用！
作用：修改复选框的选中值
默认单个复选框勾选是 true、取消是 false
用 true-value / false-value 可以自定义成你想要的值！
- 选择框的对象值<select v-model="selected">
  <!-- 绑定对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>选中后，selected 的值为对象 { number: 123 }（支持非字符串值绑定）

## 修饰符
1. .lazy - 延迟同步   输入不更新，失焦(点击页面空白处) / 回车才更新
默认 v-model 在每次 input 事件后同步数据，添加 .lazy 后改为在 change 事件（失焦或回车）后同步：
2. .number - 自动转数字
自动将输入值转为数字（用 parseFloat 解析，失败则返回原字符串）
3. .trim - 自动去除首尾空格


## 随记
```.mjs = 强制 ESM 模块模式
必须用：import / export
不能直接用：require()、module.exports、exports（CommonJS 语法）```
env文件不能上传
- 算力赚钱
- ai生成代码能力语言不重要  langchain支持js、python、java等   会写node就会写python  go   核心底层是agent开发的思维 框架    表层语言用cursor自动生成
- langchain  封装很多模块   数组