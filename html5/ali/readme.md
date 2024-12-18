# h5 界面开发

- 标注好了的设计稿，
- 交付的html & css & js
- 先写html 结构 ，再写css
- 文档流，盒模型 layout布局 (两列式布局)
- 适配 
   移动端少用，不用px 绝对大小
   用相对单位 em rem 等比例

   块级元素切换为行内块级元素display: inline-block;

- rem
  相对单位，相对于html 的font-size 相对计算   跟html相对来计算，所有单位都答应

- 750 px 设计稿  375/2 /16
  10 rem （方便等比例） = 750 html  font-size: 75px  没有绝对的
  828 px  10 rem = 828px html  font-size: 82.8px
  用5rem就可以双列布局

  让两个盒子在一起，首尾相连，有换行符
  字体大小16，继承