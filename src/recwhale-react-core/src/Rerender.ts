import {useReducer} from "react";

export default function useRerender(): () => void {

    const [_, rerender] = useReducer(x => x + 1, 0);
    return rerender;
}
