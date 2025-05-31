import {Object, Schema} from "../utils/types";
import {ActionApplier} from "./action-applier";
import {get, set} from "../utils/lodash-wapper";

export const transform = <TReturn>(data: Object, schema: Schema): TReturn => {
    return Object.entries(schema).reduce((result, [key, action]) => {
        if ('$get' in action) {
            const sourceValue = get(data, action.$get as string);
            const actionKeys = Object.keys(action);

            if (actionKeys.length === 1 && actionKeys[0] === '$get') {
                set(result, key, sourceValue);
            } else {
                // $get is present with other operators.
                // Create a new action object without the primary $get for ActionApplier.
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { $get, ...restOfAction } = action;
                set(result, key, ActionApplier.apply(sourceValue, restOfAction));
            }
        } else if ('$default' in action) {
            set(result, key, action.$default);
        } else if ('$if' in action) {
            // For a top-level $if, the context is the whole data
            set(result, key, ActionApplier.apply(data, action));
        }
        // Potentially handle other top-level operators or direct values here if necessary
        return result;
    }, {} as Record<string, unknown>) as TReturn;
};