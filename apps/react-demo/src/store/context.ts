import { createContext } from 'react';

export type RootContextPointer = NonNullable<RootContextNullablePointer>;
export type RootContextNullablePointer = Map<unknown, unknown> | null;

export const RootContext = createContext<RootContextNullablePointer>(null);
