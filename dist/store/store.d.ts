import { State } from "./types";
export declare const initialState: State;
declare const store: {
    get: () => State;
    set: (newValue: State) => void;
    subscribe: (listener: import("./types").Listener<State>) => () => void;
};
export default store;
