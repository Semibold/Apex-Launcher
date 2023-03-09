interface ITimerComProps {
    timePassed: number;
    tip?: string;
}

/**
 * @desc Pure React Component (Can reuse in other project)
 */
export const TimerCom = (props: ITimerComProps) => (
    <p>
        Time passed: {props.timePassed}s{props.tip ? ` (${props.tip})` : null}
    </p>
);
