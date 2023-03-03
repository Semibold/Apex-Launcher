/**
 * --------------------------------
 *  File extension
 * --------------------------------
 */

/**
 * style-loader
 * files with `.lazy.less` extension
 */
declare module '*.lazy.less' {
    interface ILazyStyle {
        use(): void;
        unuse(): void;
    }
    const style: ILazyStyle;
    export default style;
}

/**
 * files with specific extension
 */
declare module '*.json' {
    export default string;
}

declare module '*.png' {
    export default string;
}

declare module '*.svg' {
    export default string;
}

// declare module "*.svg" {
//     import * as React from "react";
//     const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
//     export default ReactComponent;
// }
