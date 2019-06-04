let arr = [1,45,6,7,56,6778,45,5,54,6,45];
let unique = {}, ary = [];

arr.forEach(i => {
    unique[i] = 0
})

for(let i in unique) {
    ary.push(i);
}

console.log(ary)