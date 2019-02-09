# blog  
blogsystem  
# 1-25搭建环境，完成依赖安装，仅供参考(可克隆)  
# 自行搭建  
## 准备工作  
### 一.本地准备  
1.请确认电脑安装node  
2.npm config set registry https://registry.npm.taobao.org  
此步骤为设置淘宝源，此后命令行使用npm即可(若已安装cnpm，请使用此后命令使用cnpm)  
3.安装mogodb数据库，自行下载安装，(注意data/db)  
4.安装框架express  
npm i express -g  
若已全局安装忽略此步骤  
测试安装成功express --version;出现版本号为可以使用express命令,若报错不是命令，可能存在版本问题，需安装npm i express-generator -g  
此为express命令行工具，再测试express --version出现版本号即可  
5.使用express命令构建项目  
express -e myblog //创建一个名为myblog的项目  
6.npm install //安装项目中的依赖  
7.此外需要安装数据库依赖npm i mongodb --save  
8.安装session依赖,npm i express-session --save  
9.如需要安装bootstrap@3.3.7,jquery,请自行安装其他依赖;  
至此项目环境搭建基本完成  
### 二.git 准备  
1.确认本地安装git工具https://git-scm.com/downloads  
2.初次运行需要打开git命令行进行配置  
$ git config --global user.name "John Doe"  
$ git config --global user.email johndoe@example.com  
3.生成公匙命令  
$ ssh-keygen -t rsa -C "youremail@example.com"  
4.打开用户/.ssh/id_rsa.pub,记事本打开复制粘贴到github账号设置ssh中  
5.github新建仓库存项目代码仓库地址选择SSH  
### 三.提交项目到github仓库  
1.在第一步的项目根目录中打开git，  
2.运行git init//初始化git  
3.>.gitignore//生成忽略项目文件如node_module,.project等,忽略package-lock.json，此文件在项目最后一次提交即可，否则git会产生安全漏洞错误  
4.git add .  
5.git commit -m 'tijiao'  
6.git add remote origin 你的仓库地址SSH类型的//设置远程仓库  
7.git push -u origin master  
去网上查看项目是否上传成功  
基本搭建项目完成  
###四.database为备份数据库，恢复到本地数据库  
1.备份数据库命令
>mongodump -h dbhost -d dbname -o dbdirectory
2.恢复数据库命令
>mongorestore -h <hostname><:port> -d dbname <path>
