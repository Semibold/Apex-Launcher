import { RootContext } from './context';
import { useContext } from 'react';

export function defineStore<T extends new (...args: unknown[]) => InstanceType<T>>(Ctor: T) {
    return (injectedContext?: Map<object, unknown> | null): InstanceType<T> => {
        const map = injectedContext || useContext(RootContext);

        if (!map) {
            throw new Error('[defineStore] must be used within a Provider');
        }

        if (map.has(Ctor)) {
            return map.get(Ctor) as InstanceType<T>;
        } else {
            const instance = new Ctor();
            map.set(Ctor, instance);
            return instance;
        }
    };
}
