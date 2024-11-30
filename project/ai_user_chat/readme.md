# AI 全栈项目

- 架构
 - frontend 前端
 - backend 后端
   相应http请求
   提供数据接口 user.json 数据文件    前后端对接
   文件型数据
   http服务 http：localhost:3000/users
   json-server


   - 提供 数据接口
     - npm i json-server    (提供http服务)将user.json 作为提供数据接口的包
       - http server  相应http请求  localhost 127.0.0.1
       - json 文件 json-server --port 3001  --watch user.json
    - scripts
     "dev": "json-server --port 3001  --watch user.json"
    - npm run dev(运行某个脚本)

 - llm ai server

 宽度  6列 居中