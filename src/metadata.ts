interface IMetadata {
    readonly name: string;
    readonly version: string;
    readonly revision: string;
    readonly lastCompiled: string;
}

// @ts-ignore (from webpack.DefinePlugin)
export const metadata: IMetadata = Object.freeze(__X_METADATA__);
