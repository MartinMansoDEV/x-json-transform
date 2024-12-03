import {apply, find, filter, mapper, pipe} from "./operators";
import {ActionType} from "../utils/types";

export class ActionApplier {
    static apply(value: unknown, action: ActionType): unknown {
        if ('$apply' in action) return apply(value, action);
        if ('$filter' in action) return filter(value, action);
        if ('$find' in action) return find(value, action);
        if ('$mapper' in action) return mapper(value, action);
        if ('$pipe' in action) return pipe(value, action);
        return value;
    }
}