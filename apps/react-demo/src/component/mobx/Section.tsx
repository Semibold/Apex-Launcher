import { Counter } from '../atom/Counter';
import { Heading } from '../atom/Heading';
import { MobxSubmit } from './MobxSubmit';

/**
 * @desc Should put it to page or section directory. Here is a demo.
 */
export const Section = () => {
    return (
        <>
            {/* It's a memo component */}
            <Heading />

            {/* It's a pure react component */}
            {/* DON'T USE THIS in Mobx, it's only a demo */}
            {/* Wrap it with Mobx.observer if you want to use it in mobx environment */}
            <Counter />

            {/* Share application store */}
            <MobxSubmit />
        </>
    );
};
