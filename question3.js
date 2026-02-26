// Вернуть пересечение массивов с повторением элементов: [1, 2, 2, 3].
const arr1 = [2, 1, 3, 5, 0, 2, 4, 3, 3]
const arr2 = [1, 1, 2, 7, 3, 2]

const m = new Map()

// Waaaow, yet another fkup, who could've thought right?
// Such l33t, much c0de:

arr2.forEach((d) => {
    if (m.has(d)) {
        m.set(d, m.get(d) + 1)
    }
    else {
        m.set(d, 1)
    }
})

const s = arr1.filter((d) => {
    if (m.has(d) && m.get(d) > 0) {
        m.set(d, m.get(d) - 1)
        return true
    }
    return false
})

// The thoughts were right after all, def should'nt've come today.
// I only wasted my time and (expectedly) performed like shit,
// and I still have to finish my report while feeling like crap.

s.sort((a, b) => a > b ? 1 : -1)
console.log(s)
