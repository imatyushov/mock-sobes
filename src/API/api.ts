export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let count = 0;

function getId() {
    return count++
}

export interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
    createdAt: number
}

const store:TodoItem[] = [];

export async function getItems() {
    await sleep(1_000);
    return store.map((item) => ({...item}))
}

export async function createItem(title: string) {
    await sleep(1_000);
    const item = {
        id: getId(),
        title,
        completed: false,
        createdAt: Date.now()
    }

    store.push(item);

    return item
}

export async function deleteItem(id: number) {
    await sleep(1_000);

    const storedItemIndex = store.findIndex((item) => item.id === id);
    if (storedItemIndex === -1) {
        throw new Error('item not found')
    }
    store.splice(storedItemIndex, 1)
}

interface UpdateItemData extends Partial<TodoItem> {
    id: number
}

export async function updateItem(updatedItem: UpdateItemData) {
    await sleep(1_000);

    const storedItem = store.find((item) => item.id === updatedItem.id );
    if (!storedItem) {
        throw new Error('item not found')
    }

    const result = {...storedItem, ...updatedItem};
    return result;
}


