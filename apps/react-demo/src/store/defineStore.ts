import { RootContext } from './context';
import { useContext } from 'react';

export function defineStore<T extends new (...args: unknown[]) => InstanceType<T>>(id: string, Ctor: T) {
    return (injectedContext?: Map<string, unknown> | null): InstanceType<T> => {
        const map = injectedContext || useContext(RootContext);

        if (!map) {
            throw new Error('[defineStore] must be used within a Provider');
        }

        if (map.has(id)) {
            return map.get(id) as InstanceType<T>;
        } else {
            const instance = new Ctor();
            map.set(id, instance);
            return instance;
        }
    };
}
