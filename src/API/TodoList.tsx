import React, { useState, ChangeEventHandler } from 'react';
import { createItem, deleteItem, updateItem, TodoItem} from './api';

interface ListItemProps {
    todo: TodoItem,
    onUpdate: ChangeEventHandler<HTMLInputElement>,
    onClick: ChangeEventHandler<HTMLInputElement>
}
function ListItem(props: ListItemProps) {
    const {todo, onUpdate} = props;

    // @ts-ignore
    return (
        <li>
            <input type="checkbox" checked={todo.completed} onChange={onUpdate} onClick={}/>
            {todo.title}
            <button>Edit</button>
            <button>Delete</button>
        </li>
    )
}

export default function TodoList() {
    const [todos, setTodos] = useState<any[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    function handleNewTodo(event: { target: { value: React.SetStateAction<string>; }; }) {
        setNewTodo(event.target.value);
    }

    async function addNewTodo() {
        const newTodoItem = await createItem(newTodo);
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    }

    async function deleteTodo(id: number) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    async function handleUpdate (id: number) {
        const updatedTodo = todos.find((todo) => todo.id === id);

        if (!updatedTodo) {
            return;
        }

        updatedTodo.completed = !updatedTodo.completed;
        const updated = await updateItem(updatedTodo);
        setTodos(todos.map((todo) => todo.id === id ? updated : todo))
    }

    return (
        <>
            <h1>TodoList</h1>
            <input
                value={newTodo}
                onChange={handleNewTodo}
                type="text"/>
            <button onClick={addNewTodo}>Add new todo</button>
            <ul>
                {todos.map((todo) => {
                    // @ts-ignore
                    return (
                        <ListItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdate}
                            onClick={deleteTodo}
                        />
                    )
                })}
            </ul>
        </>
    )
}
