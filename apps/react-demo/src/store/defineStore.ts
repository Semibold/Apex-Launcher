import { RootContext, RootContextNullablePointer, RootContextPointer } from './context';
import { useContext } from 'react';

export function defineStore<T extends new (pointer: RootContextPointer) => InstanceType<T>>(Ctor: T) {
    return (pointer?: RootContextNullablePointer): InstanceType<T> => {
        const map = pointer || useContext(RootContext);

        if (!map) {
            throw new Error('[defineStore] must be used within a Provider');
        }

        if (map.has(Ctor)) {
            return map.get(Ctor) as InstanceType<T>;
        } else {
            const instance = new Ctor(map);
            map.set(Ctor, instance);
            return instance;
        }
    };
}
