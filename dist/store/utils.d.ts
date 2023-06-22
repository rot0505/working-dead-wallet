import { Listener } from "./types";
export declare const makeObservable: <T>(target: T) => {
    get: () => T;
    set: (newValue: T) => void;
    subscribe: (listener: Listener<T>) => () => void;
};
export declare const checkForInjectedWallet: () => Promise<boolean>;
