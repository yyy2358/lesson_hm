- React 组件必须返回单个 JSX 元素，不能像两个按钮那样返回多个相邻的 JSX 元素。要解决此问题，可以使用 Fragment（<> 与 </>）包裹多个相邻的 JSX 元素，

- 方块并没有排列成网格，而是都在一条线上。要解决此问题，需要使用 div 将方块分到每一行中并添加一些 CSS 样式。

# props
- 父组件传递 props
父组件可以在使用子组件时，通过给子组件标签添加属性来传递数据。
<div>
    {/* 传递 props */}
    <ChildComponent text={message} /> 
</div>

- 子组件接收和使用 props
子组件可以通过函数参数的方式接收 props 对象，并在组件内部使用这些数据。
function ChildComponent({ text }) {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}//解构赋值

- 要从多个子组件收集数据，或让两个子组件相互通信，请改为在其父组件中声明共享 state。父组件可以通过 props 将该 state 传回给子组件。这使子组件彼此同步并与其父组件保持同步。

- JavaScript 支持闭包，这意味着内部函数（例如 handleClick）可以访问外部函数（例如 Board）中定义的变量和函数。handleClick 函数可以读取 squares state 并调用 setSquares 方法，因为它们都是在 Board 函数内部定义的。

.slice() 来创建 squares 数组的副本，避免直接修改原数组，符合 React 的不可变性原则  即还没下棋的格子是null，下了的格子是x或o

- useState(Array(9).fill(null)) 中的 Array(9).fill(null) 是 squares 状态的初始值。Array(9) 创建了一个包含 9 个元素的数组，fill(null) 方法将数组中的每个元素都设置为 null。

- 在 React 中，通常使用 onSomething 命名代表事件的 props，使用 handleSomething 命名处理这些事件的函数。
- value 一般用来表示方块（Square）组件要显示的内容。
。当父组件调用 Square 组件时，会把对应的值传递给 value 属性，Square 组件会在按钮内显示这个值。

- 使用 React Fragment (<> 和 </>) 包裹内容，确保组件只返回单个 JSX 元素。

squares[a] && squares[a] === squares[b] && squares[a] === squares[c]   a里有值，且a,b,c三个值相等则获胜

if (squares[i]) return;：如果该格子已经有值（即已经被下过棋），则直接返回，不做任何处理。

你将在 Board 组件的 handleClick 函数中调用 calculateWinner(squares) 来检查玩家是否获胜。你可以在检查用户是否单击了已经具有 X 或 O 的方块的同时执行此检查。

# 组件里面写的就是状态的改变逻辑，状态的改变逻辑就是组件的功能


将 squares 作为参数，可以让 calculateWinner 函数与管理棋盘状态的代码解耦。在 React 应用里，棋盘状态通常由组件的状态来管理，calculateWinner 函数不需要关心状态是如何管理和更新的，只需要接收当前的棋盘状态数组进行判断即可。