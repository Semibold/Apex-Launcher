import { createContext } from 'react';

export const RootContext = createContext<Map<string, unknown> | null>(null);
