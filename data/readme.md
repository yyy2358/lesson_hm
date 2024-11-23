# talk in data 传统方式和Prompt方式的比较

nba 赛季统计投篮数据 设计一个手shot表，设计哪些字段 
## 数据化 
player_id player_name shot_made(投中) shot_type(2rd\3rd)

team_id team_name game_id season_1(03_04) 
event_type Feed Throw 罚球 | Rebound 篮板 | Shot 投篮...
action_type Layup 上篮 | Dunk 扣篮 |Jump Shot 跳投 Hook Shot 勾手 | Fadeaway 后仰跳投... 

shotDate 
distance 

## 赛季投篮

一切皆可数据化，细致的去数学表达主题（shot）
赛季，球队，队员，得分（分数，动作，原因，结果），zone（区域，距离，坐标），position（位置，投篮位置），left（分，秒）重要性


## AI 如何帮助我们设计数据表呢？

- 数据助理
  `prompt` 提示词（提问）
  - 吴恩达的prompt engineering 擅于向ai提问
- 给定一个角色 role
   - 指定明确的任务
   - 约束必须 做什么，不做什么
   -  一步步做，细化任务
- prompt过程其实也是coding的过程

- 我想要设计一张nba 赛季投篮数据表，请给出相关字段，字段尽可能详细。
- 假设你是一位数据库工程师，   给他一个角色
- 请你帮我设计一张nba 赛季投篮数据表 shots  指定任务
  数据表需要满足mysql的约束
  请包含赛季、球队、球员、得分（得分与否、投篮动作、得分原因）、投篮位置、球员位置（如SG）、
  比赛时间，距离结束时间（分、秒）
  其他字段不需要给出
  请返回sql , 并给出原因