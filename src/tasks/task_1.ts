let id = 0;

export function getId() {
    return id++;
}

console.log(getId()) // 0
console.log(getId()) // 1
console.log(getId()) // 2
console.log(getId()) // 3
console.log(getId()) // 4
console.log(getId()) // 5
