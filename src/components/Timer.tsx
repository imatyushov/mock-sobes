import { useEffect, useState } from 'react';
//Create timer
export default function Timer() {
    const [seconds, setSeconds] = useState(0)
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        if (isStarted) {
            intervalId = window.setInterval(() => {
                setSeconds((prevState) => prevState + 1);
            }, 1_000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [isStarted]);

    return (
        <>
            <p>{seconds}</p>
            <button onClick={() => setIsStarted(() => !isStarted)}>Start</button>
            <button onClick={() => setIsStarted(() => !isStarted)}>Stop</button>
        </>
    )
}
