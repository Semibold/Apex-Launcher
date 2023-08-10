import { createContext, useContext } from 'react';
import { RootStore } from './store/root.store';

export const RootContext = createContext<RootStore | null>(null);
export const useStore = () => useContext(RootContext);
