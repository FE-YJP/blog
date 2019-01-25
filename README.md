# blog
blogsystem
#1-25搭建环境，完成依赖安装，如参考下载，请安装依赖npm install 
#自行搭建
#准备工作
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