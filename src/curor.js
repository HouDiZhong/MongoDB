const db = connect('school');
// 返回的是一个游标，指向结果集的一个指针
let curor = db.students.find();
curor.forEach(i => printjson(i))
// printjson(curor);