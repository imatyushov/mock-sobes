
export interface Product {
    id: string;
    title: string;
}

export interface Comment {
    id: string;
    body: string;
    userId: string
    productId: string;
}

export interface User {
    id: string,
    name: string;
    age: number;
}

export interface ProductToShow {
    id: string;
    title: string;
    comments: CommentMatchUser[]
}

type CommentMatchUser = {
    id: string;
    body: string;
    user: User;
}


// O(n**3) memory bad memo;
function mergeArrays ({
                                products,
                                comments,
                                users
                            }: {
    products: Product[],
    comments: Comment[],
    users: User[]
}): ProductToShow[] {
    return products.map(({ id, title}) => ({
        id,
        title,
        comments: comments.filter((comment) => comment.productId === id).map(({id, body, userId}) => ({
            id,
            body,
            user: users.find((user) => user.id === userId)!
        }))
    }))
}

//Obj: key => value;
function mergeGoodMemo({
                           products,
                           comments,
                           users
}: {
    products: Product[],
    users: User[],
    comments: Comment[]
}): ProductToShow[] {
    const userMap: {[id: string] : User} = {};

    for (let index = 0; index < users.length; index++) {
        const key = users[index].id;
        userMap[key] = users[index];
    }

    const commentsMap: {[productId: string] : CommentMatchUser[]} = {};
    for (let index = 0; index < comments.length; index++) {
        const key = comments[index].productId;
        if (commentsMap[key] === undefined) {
            commentsMap[key] = [];
        }
        commentsMap[key].push({
            id: comments[index].id,
            body: comments[index].body,
            user: userMap[comments[index].userId]
        })
    }

    return products.map(({id, title}) => ({
        id,
        title,
        comments: commentsMap[id]
    }))
}

console.log(mergeArrays({
    products: [{title: 'product', id: '1'}, {title: 'product2', id: '2'}],
    comments: [{id: '2', body: 'comm', userId: 'user', productId: 'prod'}, {id: '213', body: 'dssdf', userId: 'sdf', productId: 'dev'}],
    users:  [{id: 'dev', name: 'dev', age: 20}],
}))
