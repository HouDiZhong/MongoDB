const db = connect('school');
let arr = [];
let start = Date.now();
for(let i = 0; i < 1000000; i++) {
    arr.push({name: 'zx' + i, age: Math.random(), random: Math.random()})
}

db.students.insert(arr);

print((Date.now() - start) / 1000)