/* 注释
先将下面的数据插入students中
db.runCommand({                          // 运行命令
    group: {                             // 分组
        ns: 'students',                  // 要操作的表
        key: {province: 1},              // 根据那个字段来分 可以写多个
        query: {age: {$gt: 70}},         // 查询条件大于70
        initial: {total: 0},             // 初始值
        $reduce: function(doc,initial) {
            initial.total += doc.age;
        }
    }
}) 
*/


const db = connect('school'); 
/* let studs = [
    {province: '河南', city: '濮阳', age: 99},
    {province: '河南', city: '安阳', age: 72},
    {province: '河南', city: '洛阳', age: 72},
    {province: '北京', city: '北京', age: 75},
    {province: '天津', city: '天津', age: 75}
]
db.students.insert(studs); */

let data = db.runCommand({  
    group: {
        ns: 'students',                  
        key: {province: 1},              
        query: {age: {$gt: 70}},         
        initial: {total: 0},             
        $reduce: function(doc,initial) {
            initial.total += doc.age;
        }
    }
})
printjson(data)

