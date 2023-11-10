import { useEffect, useMemo, useState } from 'react';

/**
 * @desc Pure React Component (Can reuse in other project)
 * @ai  This code snippet defines a React component called CounterAtom.
 *      It uses the useState hook to create a local state variable called count and a function called setCount to update it.
 *      The useEffect hook is used to execute a timer that increments the count variable every second.
 *      The component renders a paragraph element displaying the current value of count.
 */
export const Counter = () => {
    const initValue = useMemo(() => Math.round(Math.random() * 10), []);
    // Local state (React)
    const [count, setCount] = useState(initValue);

    // Local counter
    useEffect(() => {
        const timerId = setInterval(() => setCount((n) => n + 1), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <p>
            Initial value: {initValue}. Local counter: {count} tick (Component Level)
        </p>
    );
};
