export function app() {

}

const array = [1, 2, 3, 4, 5];

const result = array.reduce((acc, value) => {
    return acc + value;
}, 0)

//Вопросы:
// 1. Какие проблемы решает реакт? (virtual dom, jsx)
// 2. Батчинг в реакте
// 3. Debounce/throttling
// 4. Как обновлять стейт в реакте
// 5. Reflow, repaint (стадии рендеринга)
// 6. Зачем нужен typescript
// 7. Про хуки

