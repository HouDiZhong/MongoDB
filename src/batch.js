const db = connect('school');
let arr = [];
let start = Date.now();
for(let i = 20; i < 50; i++) {
    arr.push({name: 'zx' + i, age: i})
}

db.students.insert(arr);

print((Date.now() - start) / 1000)