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
```

## update
```
db.collection.update(query,data,params)
// query     查询条件
// data      要替换的数据
params {
    multi: true,  // 默认false，只更新第一条更新到的数据，true是更新所有匹配到的数据
    upsert: true  // 默认false，更新时没有数据，就会创建一条新的数据
}

### 操作后的提示信息
{ 
    "nMatched" : 1,    // 匹配到多少条数据
    "nUpserted" : 0,   // 因为更新而插入的条数
    "nModified" : 1    // 更改的条数
}

### $set    添加字段
原始数据库信息
{ "_id" : 1, "name" : "zx", "age" : 24 }
{ "_id" : 2, "name" : "zx1", "age" : 24 }
{ "_id" : 3, "name" : "zx", "age" : 25 }

> db.students.update({name: 'zx1'},{age: 25})  // 不用操作符$set
// 更改后的数据
{ "_id" : 1, "name" : "zx", "age" : 24 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 25 }

> db.students.update({name: 'zx'},{$set: {age: 28}})  // 使用了$set 操作符
// 加上操作符$set 更改后的信息
{ "_id" : 1, "name" : "zx", "age" : 28 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 25 }

###  update中的最后一个参数
#####    multi
> db.students.update({name: 'zx'},{$set: {age: 29}},{multi: true}) // 添加multi时数据变化

{ "_id" : 1, "name" : "zx", "age" : 29 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 29 }

#####    upsert
> db.students.update({name: 'zx24'},{age: 29},{upsert: true}) // 添加multi时数据变化

{ "_id" : 1, "name" : "zx", "age" : 29 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 29 }
{ "_id" : ObjectId("5ceab9fdb2d9208fe124902b"), "age" : 29 }

> db.students.update({name: 'zx24'},{$set: {age: 29}},{upsert: true}) // 添加multi时数据变化

{ "_id" : 1, "name" : "zx", "age" : 29 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 29 }
{ "_id" : ObjectId("5ceab9fdb2d9208fe124902b"), "name" : "zx24", "age" : 29 }

### $inc    添加数量
> db.students.update({name: 'zx'},{$inc: {age: 4}})   // 给age加上4
// 给age加上
{ "_id" : 1, "name" : "zx", "age" : 32 }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 25 }

### $unset    删除字段
> db.students.update({name: 'zx'},{$unset: {age: 25}})
// {$unset: {age: 25}} age的参数不会生效，只会更新匹配条件的第一条数据
{ "_id" : 1, "name" : "zx" }
{ "_id" : 2, "age" : 25 }
{ "_id" : 3, "name" : "zx", "age" : 25 }

### $push    数组追加
{ "_id" : ObjectId("5ceb4437b8d5eb6a3038de94"), "name" : "zx", "hobby" : [] }
> db.students.update({name: 'zx'},{$push: {hobby: '篮球'}})

{ "_id" : ObjectId("5ceb4437b8d5eb6a3038de94"), "name" : "zx", "hobby" : [ "篮球" ] }

### $ne    匹配条件
{ "_id" : ObjectId("5ceb4437b8d5eb6a3038de94"), "name" : "zx", "hobby" : [] }
> db.students.find({name: {$ne: 'zx'}})   // 因为加了$ne
//  数据里有一条name为zx的，但是输出结果为空

> db.students.update({name: 'zx',hobby: {$ne: '篮球'}},{$push: {hobby: '篮球'}}) 
// 因为hobby 加了$ne等于篮球，所以就不会在数组再添加一次
{ "_id" : ObjectId("5ceb4437b8d5eb6a3038de94"), "name" : "zx", "hobby" : [ "篮球" ] }

### $addToSet    set在se6中不允许重复
> db.students.update({name: 'zx'},{$addToSet: {hobby: '篮球'}})
// 匹配到一条，但是没有更新也没有更改
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
// 执行了条件之后
{ "_id" : ObjectId("5ceb4e0fb8d5eb6a3038de95"), "name" : "zx", "hobby" : [ "篮球" ] }

### $each    将添加的数据遍历出来
加上了$each
> db.students.update({name: 'zx'},{$addToSet: {hobby: {$each: ['羽毛球','橄榄球']}}})

{ "_id" : ObjectId("5ceb4e0fb8d5eb6a3038de95"), "name" : "zx", "hobby" : [ "篮球", "羽毛球", "橄榄球" ] }

如果不加上 $each
db.students.update({name: 'zx'},{$addToSet: {hobby: ['羽毛球','橄榄球']}})
{ "_id" : ObjectId("5ceb4e0fb8d5eb6a3038de95"), "name" : "zx", "hobby" : [ "篮球", [ "羽毛球", "橄榄球" ] ] }

### 修改指定索引元素
db.students.update({name: 'zx'},{$set: {'hobby.2': '足球'}})  // hobby.2  是指数组的下标
// 修改后的数组
{ "_id" : ObjectId("5ceb4e0fb8d5eb6a3038de95"), "name" : "zx", "hobby" : [ "篮球", "羽毛球", "足球" ] }
```
### [runCommand()](./index.js '点击查看')