git有哪些命令？ 
版本控制软件 多人协，几个亿的项目
写项目？ 电脑坏了 保存代码的版本且安全，团队间代码的协作 
git帮我们在本地管理代码版本 远程仓库（分布式） 
常用操作，自我代码管理和简单的协作
- git init 初始化
把代码加入到仓库分3步
- git add. 提交到暂存区
- git commit -m"" 提交到本地仓库
- git push  origin main 提交到远程仓库

- git branch 分支
- git checkout 切换分支
- git merge 合并分支
 
 ## 大厂需要的git能力
 - git 是必备技能
 - 高级技巧，考点
 - git 文档内置
 - git help 常用的giit命令
 - git help -a 列出所有的名单
 - vi编辑器 ：j ：k 上下翻页 ：q 退出
git help add   深入的了解某个命令
你是如何了解git命令的作用和参数的？   
（git自带解释）git help 加上某个命令，看文档

## 代码仓库
 文件夹->开发目录（网站）-> 代码仓库（git）
 - 好处
 项目代码的版本（version） git关注的是代码的版本
 时光穿梭机  文件的任何版本 有时候我们要回退
- git 仓库里存的是啥？
文件？文件的版本（对）
拿着相机一直拍
.git 目录就是 仓库
git 相关的内容就放在.git目录里
git config 配置 操作留下了责任人，多人协作的思想
老板就知道谁提交的代码？
git config --global user.name "你的名字"
git config --global user.email "" 本地 远程 比对
配置 --global 全局

git status 当前仓库的状态 
on branch master 分支
on branch main 主分支上 默认分支
untracked files 未跟踪的文件 还没有纳入版本管理
use commit

添加到仓库是件比较严谨的事情
- git add file
将文件的当前版本 先添加到暂存区
- git status

为什么需要暂存区，仓库两个概念？
- 后悔药
- 分几次add，然后一次性commit
 进货，有辆买菜车 （git add 多次） 买完了 （git commit 一次）买好菜了
 仓库里提交的是版本号，可以有多个文件

 - git status 让我们了解当前仓库的状态，摸鱼后还能人间清醒

 - git log 
 代码提交记录
 --oneline 一行显示

 - 暂存区 仓库
  - 一次性多个文件多次加入暂存区，后悔，组成一个提交逻辑（任务）
  - 一次commit -m 要规范 讲清楚任务
  - 不要随便提交commit，围绕开发需求，有逻辑性
  - 一个商务 2-5次commit 多摸鱼

- ls 和 dir 是两个命令，用于列出当前目录中的文件和子目录。在Git中，你可以在任何目录中使用这些命令来查看目录结构。

- git status 是一个Git命令，用于显示当前仓库的状态。当你运行这个命令时，Git会告诉你哪些文件被修改、添加或删除了，以及哪些文件还没有被跟踪。

- 修改了代码之后要重新提交并写入commit

git add .     用于将当前目录及其子目录中的所有更改（包括新文件、修改过的文件和删除的文件）添加到 Git 的暂存区    
git commit -m 'learn git'        提交信息





git config --global user.ui true
git config --list
cd .git   cd ..   
讲的深入，跟故事一起记住，记得深
HEAD -> master
