# 层叠上下文
   
# 页面渲染规则

- 文档流
  body 开始从上到下，从左到右

- 布局 Layout

- 盒模型 盒子(本身)大小
  有盒能力就可以设置宽高
  box-sizing  border+padding+content
  盒模型 标准盒模型 content-box   w h  content 
  IE盒模型 border-box

- 认标签，也可转变 display
  块级元素 block  独占一行  
  行内元素 inline 不用于做盒子 不能设置宽高，宽高由内容决定  所以盒模型大小要用box-sizing 来设置
  块级元素为何默认宽度100%？
    html 是第一个BFC 元素， body 参与html的BFC
    页面显示由html负责 要完成页面的布局  块级元素从上到下 行内元素从左到右   所以块级元素占据整个一行
    html默认BFC                   

- display

- BFC Block Formatting Context 块级格式化上下文
  - html 是根元素，也是最顶级的BFC
  - context 块级元素从上到下，行内元素从左到右

- 格式上下文？ Formatting Context  我跟谁混
  - 为何弹性布局会脱离文档流？ 打破了html BFC 的规则？
     - BFC 不是某个元素的特例 ，弹性布局创立了一个新的BFC
     - BFC 不受外界影响，全新的独立渲染区域 FFC  Flex Formatting Context  （弹性格式化上下文）
       flex-direction: row|column
     弹性布局是一个独立的BFC  脱离了文档流
  
- GFC 网格布局 
  行跟列

- 为什么会发生层叠？

# BFC
  - 独立渲染区域，不受外界影响
  - html 是最顶级的BFC
  - block level box 垂直方向，一个接一个的放置，且宽度100%
  - 盒子垂直方向的距离由margin 决定，同一个BFC 的相邻盒子 margin会重叠，大的说了算
  - 每个元素的margin 左边，与包含块border的左边相接触，即使存在浮动也一样
  - BFC 区域不会与float box 重叠
  - BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
  - 计算BFC的高度时，浮动元素也参与计算
  - 触发新BFC
   - overflow:hidden|auto...  不为visible  水杯盛开水  水溢出  水杯就会形成新的BFC
