import { State } from "./types";
export declare const useStore: () => {
    state: State;
    setState: (newState: State) => void;
};
