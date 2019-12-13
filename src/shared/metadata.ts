interface Metadata {
    readonly name: string;
    readonly version: string;
    readonly revision: string;
    readonly lastCompiled: string;
}

// @ts-ignore (from webpack.DefinePlugin)
export const metadata: Metadata = Object.freeze(__X_METADATA__);
