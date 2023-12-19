import { createContext } from 'react';

export const RootContext = createContext<Map<object, unknown> | null>(null);
