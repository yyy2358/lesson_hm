# createApp
- createApp 是 Vue 3 中用于创建 Vue 应用实例的核心 API
- const app = createApp({})
- 创建一个全新的 Vue 应用根实例，作为整个应用的起点
- 通过 .mount(selector) 方法，将 Vue 应用挂载到页面中指定的 DOM 元素上（比如#app）

## 根组件模板
- 模板就是这个组件要渲染到页面上的 HTML 结构
- 把模板直接写在根组件的 template 选项里
- 把模板直接写在挂载的 DOM 元素里，根组件只负责数据和逻辑

## api
- Vue API 就是 Vue 框架提供给开发者的可调用函数、对象和规则
- createApp()：创建 Vue 应用实例的 API
- ref()：创建响应式变量的 API
- .mount()：将应用挂载到 DOM 元素的 API

JS 标准的三元表达式：条件 ? 满足条件的结果 : 不满足的结果
.split('').reverse().join('') 字符串反转写法
- split('')：把字符串按每个字符拆成数组 → ['H','e','l','l','o',' ','V','u','e']
- reverse()：把数组反转 → ['e','u','V',' ','o','l','l','e','H']
- join('')：把数组再拼回成字符串 → euV olleH

list-${id}`是 JS 的**模板字符串**，会把id` 变量的值拼到字符串里

Mustache 语法（双大括号）中只能写表达式，不能写语句
表达式	✅ 可以	1 + 1、user.name、ok ? 'a' : 'b'、formatDate(date)
语句	❌ 禁止	var a = 1、if(){}, for(), return

- v-if="变量/表达式"，值为 true 时渲染，false 时不渲染
- v-if：是 “惰性” 的。如果初始值为 false，它根本不会渲染该元素到 DOM 中（切换成本高，初始渲染成本低）。
- v-show：无论初始值真假，元素都会渲染，只是通过切换 CSS 的 display: none; 来显示隐藏（初始渲染成本高，切换成本低）

点击按钮：执行 isShow = !isShow → isShow 变为 false → 元素隐藏。<button @click="isShow = !isShow">
<div :class="{ active: isActive }" v-if="isShow">
  动态样式 + 条件渲染
</div>
 Vue 里一种固定的语法，叫对象语法。
简单来说，{ active: isActive } 的意思就是：根据 isActive 的真假，决定要不要加 active 这个类。

**调用函数**
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
:title="toTitleDate(date)"：把 date 传给 toTitleDate 方法，用返回值当 <time> 标签的 title 属性
{{ formatDate(date) }}：把 date 传给 formatDate 方法，用返回值当标签显示的文本

- 限制全球访问
Vue 模板是沙箱环境，不是完整的 JS 环境：
只能访问有限的全局对象，比如 Math、Date 这些内置函数
像 window、自定义的全局变量，默认在模板里用不了（防止安全问题、误操作）
如果你非要在模板里用自定义全局方法，可以通过 app.config.globalProperties 手动挂载，让所有组件都能访问  

① app.config
Vue 应用的全局配置对象。
② globalProperties
全局属性注册表，你往这里加东西，所有组件都能访问到。
③ $formatDate
你给全局方法起的名字，前面加 $ 是为了区分全局方法和本地变量。

 // ✅ 挂载自定义全局方法
app.config.globalProperties.$formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}//一个全局工具函数注册进去
接收一个日期
把它格式化成本地中文日期
比如：2026-04-02 → 2026/4/2
$ 是 Vue 的全局命名约定

<a @click="doSomething">点我</a>
点击这个 a 标签 → 自动执行 doSomething 函数
<script>
export default {
  methods: {
    // 这就是 doSomething
    doSomething() {
      alert("你点击了我！");
    }
  }
}
</script>
- 事件绑定
v-bind:class → :class（绑定动态样式类，超常用）
v-bind:style → :style（绑定动态内联样式）
v-on:input → @input（监听输入框输入）
v-on:submit → @submit（监听表单提交）

Vue 支持用方括号 [] 包裹 JavaScript 表达式，让「参数」也变成动态的
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
v-if	根据表达式真假，插入 / 移除元素	无
v-for	循环渲染列表	无
v-bind	把数据绑定到 HTML 属性上	:
v-on	给元素绑定 DOM 事件监听	@
v-slot	插槽（组件传内容用）	#
v-html	把字符串渲染成 HTML（注意安全）	无

## 事件修饰符
1. 事件修饰符（跟 @click / @submit 一起用）
.prevent：阻止默认行为（最常用）
.stop：阻止事件冒泡
.once：只执行一次
<form @submit.prevent="onSubmit">...</form>
解释：
@submit：表单提交事件
.prevent：修饰符
功能 = 自动帮你执行 event.preventDefault()
→ 阻止表单默认的刷新页面行为

2. v-model 修饰符（表单输入用）
.trim：去掉首尾空格
.number：转成数字
.lazy：失去焦点再更新

## 反应性基础
ref() 是 Vue 3 中创建响应式变量的 API
通过.value 来访问和修改响应式变量的值(实际值)

使用ref创建的响应式数据，必须通过setup（包括<script setup>语法糖），把这个ref注册到组件的「渲染上下文」中。、
修改响应式状态后，DOM 会异步更新（Vue 会缓冲到 “下一个 tick” 以避免重复渲染）。若需等待 DOM 更新完成，可使用 nextTick()。

解包 = Vue 自动帮你拆开 ref 对象的包裹，不用写 .value   因为 ref 创造的对象，值被藏在 .value 里

Map 的键值对，是存在 Map 的内部专属存储空间里的，不是挂在 Map 实例对象的属性上
只有用 map.get('count')，才是去 Map 的内部存储空间里，查找键为count对应的值。

Map / 数组里的 ref：
只有 {{ map.get('count') }} 纯展示 → ✅ 自动解包
只要运算、JS、逻辑 → ❌ 不能解包，必须写 .value

// 2条键值对，外层数组包2个内层键值对数组
const map = new Map([
  ['count', ref(0)],  // 第一条：键count，值ref(0)
  ['name', 'Vue教程'] // 第二条：键name，值Vue教程
])

顶层属性 = 直接暴露在模板渲染上下文最外层的变量，不是 “藏在某个对象里的属性”
解构 = 把对象 / 数组里的某个值，快速 “掏出来” 变成一个独立的新变量（ES6 语法，专门为了少写代码）
/ ✅ 用解构的新写法：直接把 id 从 object 里掏出来
const { id } = object 
// 这行代码等价于：const id = object.id

## export default
- 一个模块只能有一个 export default，导出一个默认值 
- 导入语法	import x from '...'
- 导入名称可以自定义
## export
- 一个模块可以有多个 export，导出多个值
- 导入语法	import { x, y } from '...'
- 导入名称必须与导出名称一致

track() // 追踪依赖  trigger() // 触发更新
proxy   Proxy 是 JavaScript 原生的一个 “代理对象”，它就像一个房产中介，站在你（原对象）和外界（代码）之间。
const raw = {}       // 👈 这是【你】
const proxy = reactive(raw) 
// 👆 括号里放你 = 让中介代理你
// 👆 proxy = 【全新的中介】，不是你！

reactive()局限性
reactive 只能代理对象、数组、Map/Set 等复杂类型，不能代理原始类型（如数字、字符串、布尔值等）
const state = reactive({ count: 0 })

function callSomeFunction(num) {
  num++ // 只是修改了传进来的普通数字，和 state 没关系
}

// ❌ 错误：直接传 state.count，传的是普通值，丢失响应性
callSomeFunction(state.count) 

// ✅ 正确：传整个 state 对象，保留响应性
function callSomeFunction(obj) {
  obj.count++ // 通过对象改属性，中介能检测到
}
callSomeFunction(state)

## 计算属性
computed(() => { ... })：传入一个 “getter 函数”，返回值是一个计算属性 ref。
- 基于响应式依赖缓存：只有依赖（如 author.books）变化时才重新计算。
- 方法：无缓存：每次页面重新渲染，方法都会重新执行。
- 缓存的意义：
假设计算属性需要遍历一个巨大的数组、做大量计算，缓存能避免重复执行，提升性能。
- 计算属性默认是只读的（只能获取值，不能赋值）。如果需要 “可写”，可以同时提供 get 和 set。
- 为什么要用计算属性？
模板内的表达式适合简单逻辑，逻辑过多会让模板臃肿难维护。
- .split(' ') 是 JavaScript 中 字符串的一个方法，用来把一个字符串按指定的分隔符拆分成数组。
如果分隔符是空字符串 ''，就会把字符串拆成单个字符
- computed(() => {}) 是 Vue 计算属性的「最简写法」
专门用于：只需要「读取 / 计算」值，不需要「修改 / 赋值」 的场景
- 完整写法是const publishedBooksMessage = computed({
  // 专门用来「取值」的函数
  get() {
    return author.books.length > 0 ? 'Yes' : 'No'
  }
})//Vue 会自动把箭头函数识别为 get 方法 Vue 规定：计算属性的 getter 必须是一个函数

## 解构
- 解构赋值是 ES6 推出的 JavaScript 核心语法，核心作用是：快速从数组 / 对象中提取值，直接赋值给变量，大幅简化重复的取值代码。
- 数组解构是「按位置顺序匹配」，左边中括号里的变量，会按从左到右的顺序，依次接收右边数组对应位置的值。
1. 可以用空逗号占位，跳过数组中不需要的项
const [, , third] = ['a', 'b', 'c']
console.log(third) // 输出 'c'，跳过了前两项
2.用扩展运算符...把剩下的所有项收进一个新数组：
const [first, ...rest] = [1, 2, 3, 4]
console.log(first) // 1
console.log(rest)  // [2, 3, 4]
3.如果右边数组没有对应位置的值，会用默认值兜底，避免出现undefined：const [a=0, b=0] = [1]
console.log(a) // 1（匹配到了值，不用默认值）
console.log(b) // 0（没匹配到值，用默认值

对象解构  对象解构是「按属性名匹配」，和顺序无关，只要属性名对应上，就能提取到值。
const user = {
  name: '张三',
  age: 20,
  gender: '男'
}

// 按属性名解构，顺序随便换，不影响结果
const { name, age } = user
console.log(name) // '张三'
console.log(age)  // 20

1.重命名变量const { name: username, age: userAge } = user
console.log(username) // '张三'
console.log(name)     // 报错，name变量不存在
2.设置默认值
const { height = 180 } = user
// user里没有height属性，用默认值180
console.log(height) // 180
3.嵌套对象解构
const student = {
  name: '李四',
  score: {
    math: 90,
    english: 85
  }
}

// 嵌套解构，直接拿到math的值
const { score: { math } } = student
console.log(math) // 90
4.函数参数解构
// 定义函数时，直接解构参数对象
function sayHi({ name, age=18 }) {
  console.log(`你好，我是${name}，今年${age}岁`)
}

// 传参时只需要传一个对象，不用关心顺序
sayHi({ name: '王五' }) // 输出：你好，我是王五，今年18岁
**注意**如果你先声明了变量，再单独写解构赋值，行首必须加分号，否则 JS 会把上一行和当前行当成一句代码执行，导致报错：
对象里的属性不等于变量 想要打印要从对象里取出来变成变量 

## 三元表达式
- 条件 ? 满足时的值 : 不满足时的值
eg：isActive ? activeClass : '' → 三元表达式（条件判断），核心就是：满足条件就加类，不满足就不加
- active: isActive.value && !error.value
只有当「isActive 是 true」并且「没有 error」时，才显示 active 类    error 为 null/undefined/false

## 可选链操作符
- ？. 可以安全地访问对象的属性，而不用担心对象为 null 或 undefined。防止访问不存在的属性时抛出错误。页面崩溃
'text-danger': error.value?.type === 'fatal'
只有当「error 存在」并且「error 的类型是 'fatal'」时，才显示 text-danger 类
fatal它是我们用来标记错误类型的一个 “标签”

 Vue 对象绑定类 的写法   数组里的对象：{ [activeClass]: isActive }
 [activeClass]：ES6 语法，用变量作为对象的键
→ 因为 activeClass = 'active'，所以等价于 { active: isActive }

单根组件：子组件模板里 只有 1 个标签（最常用）
多根组件：子组件模板里 有 2 个及以上标签（特殊情况）
$attrs：Vue 自带的工具，专门存父组件传给子组件的属性（比如 class、id、title 等）
$attrs.class：就是拿到父组件传过来的类名

const styleObject = reactive({ color: 'red', fontSize: '30px' })   
<div :style="styleObject"></div>