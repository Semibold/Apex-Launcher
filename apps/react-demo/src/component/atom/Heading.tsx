import { memo } from 'react';

/**
 * @desc Pure React Component (Can reuse in other project)
 * @desc React memo example
 */
export const Heading = memo(function Heading() {
    // Check console message in devtool
    console.log('[debug] Every component should be memoized and log once');
    return <h2>Hello world! (Static Content)</h2>;
});
