import { Counter, ICounterRef } from '../atom/Counter';
import { Heading } from '../atom/Heading';
import { MobxSubmit } from './MobxSubmit';
import { useRef } from 'react';

/**
 * @desc Should put it to page or section directory. Here is a demo.
 */
export const Section = () => {
    const ref = useRef<ICounterRef>(null);

    return (
        <>
            {/* It's a memo component */}
            <Heading />

            {/* It's a pure React component */}
            {/* DON'T USE THIS in Mobx, it's only a demo */}
            {/* Wrap it with Mobx.observer if you want to use it in mobx environment */}
            <Counter ref={ref} />

            <button onClick={() => ref.current && ref.current.add(100)}>+100</button>

            {/* Share application store */}
            <MobxSubmit />
        </>
    );
};
