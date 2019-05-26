## robomongo mongo可视化工具

## 配置服务
```
删除服务
sc delete mongodb

添加服务
mongod.exe --dbpath E:\mdata --logpath E:\mlog --logappend --directoryperdb --serviceName "MongoDB" --install

--bind_ip	绑定服务IP，若绑定127.0.0.1，则只能本机访问，若绑定0.0.0.0，则默认可以通过ip来访问
--logpath	指定MongoDB日志文件，注意是指定文件不是目录
--logappend	使用追加的方式写日志
--dbpath	指定数据库路径
--port	指定服务端口号，默认端口27017
--serviceName	指定服务名称
--serviceDisplayName	指定服务名称，有多个mongodb服务时执行
--directoryperdb     每一数据库单独存放

--install	指定作为一个Windows服务安装
```

## 使用mongod 启动服务端
```
mongod --dbpath=./data
````

## 使用数据库
```
mongo 
// 启动客户端

show dbs 
// 查看所有的数据库

use school  
// 切换到school这个数据库，但是现在并不会创建。有没有这个数据库都可以切换过去

db.students.insert({name: 'zx',age: 24})
// db代表当前数据库  students代表新建集合 insert插入一条数据

db.students.remove({"_id": 1})；
// 根据条件删除记录

db || db.getName()
// 查看当前的数据库的名称

db.dropDatabase()
// 删除当前的数据库

use school
db.createCollection('students')
// 切换到school 新建集合students

db.students.find()
// 查询students 下的数据

db.students.save({name: 'zx',age: 24})
// save = insert + update;有就更新没有就创建

show collections
// 查看有哪些集合


db.collection.update(query,data,params)
// query     查询条件
// data      要替换的数据
// params    替换数据的一些参数

操作符  $set  查看图一和图二

```
[图一](./imge/1.png)   [图二](./imge/2.png)