# lesson_hm
ai fullstuck learning

AI, so greate!
mysql
请求模拟器，url
请求体body
josn-server，next框架
一文看懂。。。      ai回答看了并不会可以在百度搜索csdn
一文看懂：网址，URL，域名，IP地址，DNS，域名解析_域名和url分别怎么看(1)，，，，，promise八股文
计算机网络，后端go 10小时高效

手写脚本代码测试？
headers，cookie，body，，，，是什么？
js八股文


清理包管理器缓存：
Node.js 的 npm：

bash
npm cache clean --force

在 GitHub 等平台上，你可以手动创建新的仓库。也可以使用命令行工具，如 git 结合平台 API 创建。例如，在本地初始化一个新的 Git 仓库：

mkdir new-project
cd new-project
git init
克隆仓库
将远程仓库的代码复制到本地，使用 git clone 命令：

git clone https://github.com/username/repo-name.git
提交更改
在本地修改代码后，需要将更改提交到本地仓库，再推送到远程仓库：

# 添加更改到暂存区
git add .
# 提交更改到本地仓库
git commit -m "描述本次更改的信息"
# 将本地仓库的更改推送到远程仓库
git push origin main
管理多个 repos
如果你有多个代码仓库，可能需要高效管理它们。可以使用一些工具来辅助管理，例如：

gh 命令行工具：GitHub 官方提供的命令行工具，可用于管理 GitHub 上的仓库。
# 安装 gh 工具
brew install gh  # macOS 使用 Homebrew 安装
# 登录 GitHub
gh auth login
# 列出所有仓库
gh repo list

一个“关于我”部分，介绍你的工作和兴趣
你引以为傲的贡献，以及这些贡献的背景介绍
在你参与的社区获得帮助的指导

# git用户名更改
git config --global user.name "Mona Lisa"

把当前的工作目录改成你想配置与 Git 提交关联名称的本地仓库。

设置一个Git用户名：

git config user.name "Mona Lisa"

输入 git remote -v，然后按回车 。你会看到当前为你的分支配置的远程仓库。
输入 git remote add upstream，然后粘贴你在步骤 3 复制的 URL，按回车键。它会长这样：

git remote add upstream https://github.com/ORIGINAL-OWNER/Spoon-Knife.git

upstream(上游仓库 原作者的仓库) 没有直接推送(git push)权限，只能拉取(git pull)git merge upstream/main 合并  git fetch upstream 的核心作用是：从「原作者的仓库（upstream）」下载最新的代码和分支信息到你的本地仓库，但不会直接修改你当前正在工作的本地分支。
git checkout main查看分支的本地默认分支

可以把它理解成：「去原作者的仓库看看有没有新更新，把更新内容下载到本地暂存，但不动我正在写的代码」。
origin(远程仓库 你fork后的仓库) 能直接推送(git push)更改的仓库
# 分叉
git clone https://github.com/你/awesome-project → 这是你的本地仓库
配置上游仓库# 格式：git remote add upstream 原作者仓库的地址
git remote add upstream https://github.com/张三/awesome-project.git  给本地仓库添加上游仓库 同步原作者最新代码
git fetch upstream  从上游仓库获取最新的更改并拉到本地不会自动合并
git merge upstream/main  合并上游仓库的更改到当前分支
git pull=git fetch upstream && git merge upstream/main  合并上游仓库的更改到当前分支 
如果其他人已推送到与您相同的分支，Git 将无法推送您的更改
可以 git pull origin YOUR_BRANCH_NAME

让某个特定子文件夹成为新仓库 git-filter-repo

如果你的本地有独有的提交（比如你改了代码并 git commit 了），Git 就不会快进，而是会创建一个「合并提交」，把上游的更改和你的本地更改整合到一起，这样既同步了上游，又保留了你的本地修改。


 `git remote set-url` 命令更改现有的远程存储库 URL。
使用 git remote rename 命令重命名现有远程。
使用 git remote rm 命令从存储库中删除远程 URL。
# URL为SSH时怎么克隆 配置远程 将html改为SSH？

git status是 Git 的基础命令，用于查看仓库当前状态。它会告诉你：

1. 主要功能
显示工作区和暂存区的文件状态

列出已修改、未跟踪、已暂存的文件

提示下一步可以做什么（如 git add、git commit）

学cursor  大模型  刷面试题 算法    外包接单

es6
Promise八股文