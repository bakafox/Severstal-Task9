/* eslint-disable no-console */

console.log(1)

new Promise((resolve) => {
    console.log(2)

    setTimeout(() => {
        resolve()
        console.log(3)
    }, 0)
})
    .then(() => console.log(4))
    .then(() => console.log(5))

setTimeout(() => {
    console.log(6)
}, 0)

console.log(7)
