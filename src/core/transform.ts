import {Object, Schema} from "../utils/types";
import {ActionApplier} from "./action-applier";
import {get, set} from "../utils/lodash-wapper";

export const transform = <TReturn>(data: Object, schema: Schema): TReturn => {
    return Object.entries(schema).reduce((result, [key, action]) => {
        if ('$get' in action) {
            const sourceValue = get(data, action.$get);
            set(result, key, ActionApplier.apply(sourceValue, action))
        } else if ('$default' in action) {
            set(result, key, action.$default)
        }
        return result;
    }, {} as Record<string, unknown>) as TReturn;
};