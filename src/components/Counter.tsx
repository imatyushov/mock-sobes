import {useState} from "react";

export function Counter() {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            {counter}
            <button onClick={() => setCounter((c) => c + 1)}>+</button>
            <button onClick={() => setCounter((c) => c - 1)}>-</button>
        </div>
    )
}
