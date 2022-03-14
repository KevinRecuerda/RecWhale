import {useReducer} from "react";

export function useRerender(): () => void {

    const [_, rerender] = useReducer(x => x + 1, 0);
    return rerender;
}
