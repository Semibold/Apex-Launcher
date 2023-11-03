import { useEffect, useRef } from 'react';
import { CounterAtom } from './Counter.Atom';
import { HeadingAtom } from './Heading.Atom';

interface ITimerAtomProps {
    timePassed: number;
    tip?: string;
    node?: HTMLElement;
}

/**
 * @desc Pure React Component (Can reuse in other project)
 * @ai  This code snippet defines a React component called TimerAtom.
 *      It takes in props node, timePassed, and tip. Inside the component, it creates a reference using the useRef hook.
 *      It also uses the useEffect hook to append the node to the ref.current element when the component mounts.
 *      The useEffect hook also returns a cleanup function that removes the node from the ref.current element when the component unmounts.
 *      The component renders a CounterAtom component and a paragraph element that displays the timePassed prop.
 *      If the tip prop is provided, it appends the tip value to the paragraph element.
 */
export const TimerAtom = ({ node, timePassed, tip }: ITimerAtomProps) => {
    const ref = useRef<HTMLParagraphElement>();

    useEffect(() => {
        node && ref.current.append(node);
        return () => node && node.remove();
    }, []);

    return (
        <>
            {/* It's a memo component */}
            <HeadingAtom />

            {/* It's a pure react component */}
            {/* DON'T USE THIS in Mobx, it's only a demo */}
            {/* Wrap it with Mobx.observer if you want to use it in mobx environment */}
            <CounterAtom />

            <p ref={ref}>
                Time passed: {timePassed}s{tip ? ` (${tip})` : null}
            </p>
        </>
    );
};
