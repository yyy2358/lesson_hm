# VUE + REACT CLI 命令行

- vue-lic command line 
   - 比较复杂的大型项目，不是简单的页面开发(cdn引入)
    web app ， 而非page
   - npm init vite
     vite 快速构建前端项目，前端基建工具（工程化的核心套件）
     npm init 初始化项目  将初始化交给vite 这个工程化巨佬
      - 标准模板项目
       - 没必要每次都搞 

         npm install vite@^5


         生产依赖与开发依赖

    - 项目的结构
      - package.json 项目描述文件  
        依赖
        - vue 3^ 开发期间和上线了都要   在生产环境中运行所必需的依赖包。
        - vite 开发阶段才用，上线后不需要（前端基建）vite 是前端基建里面的包工头 devDependencies

    - development 工程的不同生命周期（阶段）
       - dev 开发阶段
       - test    测试阶段
       - build 上线阶段（进行时）  npm run build  打包上线 脚本区域里
       - online 运营维护

- npm run dev vite
  - 先找到 index.html  http协议 5173
   - index.html放到 首页 website   都不用liveserver
   - 挂载点 #app
   - src/main.js 逻辑入口文件

  - scr/main.js
    - src 开发目录
      开发的主战场
    - main.js 入口文件
      createApp().mount('#app')
    - App.vue
      .vue 专属后缀
      - 三段式
        - template 模板 写结构 {{}}
        - script 逻辑
          声明响应式
          事件
          ...
        - css 样式

    - .vue 太好 胶囊一样 
    - 组件就是 > html 页面构建模块   
     组件是现代前端的开发新单元（比html大）
     由一个逻辑单元的html构成（一堆html）+css +js  （汉堡包.vue）  
     某项功能的抽象

     - 现代前端开发拥抱组件思维，vue前端组件库    不再做牛马  以包工头为例 
     - 组件按功能划分 
     - 组件 = html（一堆）+css（一堆）+js（一堆）
     - .vue 三段式组合这个组件
      公司写的就是组件，每一个组件都是不同的功能
     - 轮播图 功能属性凸显 经典组件
     - 前端的开发单位是组件，不是页面，因为页面有可能会重复 轮播图
        不能以html 为单位？ 单个功能弱小 
     - 从工程化角度理解组件
       - 按功能块划分，好安排工作
       - 组件可以复用（.vue） import 不用写两次
       - 好维护
     - 组件以标签的方式嵌入页面
     - 可读性非常好

     Vue.js devtools 可以直接看到组件