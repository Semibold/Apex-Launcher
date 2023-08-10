import { useEffect, useRef } from 'react';

interface ITimerComProps {
    timePassed: number;
    tip?: string;
    node?: HTMLElement;
}

/**
 * @desc Pure React Component (Can reuse in other project)
 */
export const TimerCom = (props: ITimerComProps) => {
    const ref = useRef<HTMLParagraphElement>();

    useEffect(() => {
        if (props.node) {
            ref.current.append(props.node);
            return () => props.node.remove();
        }
    }, []);

    return (
        <p ref={ref}>
            Time passed: {props.timePassed}s{props.tip ? ` (${props.tip})` : null}
        </p>
    );
};
