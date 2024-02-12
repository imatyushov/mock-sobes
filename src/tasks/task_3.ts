
export const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1_000);
})

promise
    .then((resolve) => resolve * 2)
    .then((resolve) => resolve * 2)
    .catch((error) => {
        console.error(error);
        return 1_000;
    })

//-----------------------------------------------
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

// Преобразуем каждый URL в промис, возвращённый fetch
let requests = urls.map(url => fetch(url));

// Promise.all будет ожидать выполнения всех промисов

Promise.all(requests)
    .then((responses) => responses.forEach((response) => {
        console.log(response);
    }))

//-----------------------------------------------

//TODO: написать свой Promise.all
const promises = [];

export function promiseAll<T>(promises: (Promise<number> | Promise<string>)[]) {
    const resultsArray: any[] = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        for (let index = 0; index < promises.length; index++) {
            promises[index]
                .then((res) => {
                    count++
                    resultsArray[index] = (res);

                    if (promises.length === count) {
                        resolve(resultsArray);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

//export const firstPromise = new Promise<number>((res, rej) => {
//     setTimeout(() => res(10), 3000 );
// })
// export const secondPromise = new Promise<string>((res, rej) => {
//     setTimeout(() => {
//         res('success');
//     }, 2000)
// })
// export const thirdPromise = new Promise<string>((res, rej) => {
//     setTimeout(() => {
//         rej('bad job');
//     }, 1000)
// })
