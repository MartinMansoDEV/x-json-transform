import {apply, find, filter, mapper, pipe, handleIf} from "./operators";
import {ActionType, ActionBase} from "../utils/types";
import { get } from "../utils/lodash-wapper"; // Import lodash-like get

export class ActionApplier {
    static apply(value: unknown, action: ActionType): unknown {
        // Order matters: more specific operators first
        if ('$if' in action) return handleIf(value, action.$if);
        if ('$apply' in action) return apply(value, action); // $apply uses value directly
        if ('$filter' in action) return filter(value, action); // $filter iterates over value if array
        if ('$find' in action) return find(value, action);   // $find iterates over value if array
        if ('$mapper' in action) return mapper(value, action); // $mapper might use $get internally or apply to value
        if ('$pipe' in action) return pipe(value, action);   // $pipe passes value through

        // Handle $get as a base operation if no other operator is specified,
        // or if it's part of an action that didn't get handled above (e.g. a simple { $get: 'path' })
        // This means 'value' is the context (e.g., 'data') from which to get.
        if ('$get' in action) {
            return get(value, (action as ActionBase).$get as string);
        }

        // If action is not an operator object but a literal passed by mistake (e.g. from a resolved $if branch)
        // or if it's an empty object, or an unhandled operator.
        if (typeof action !== 'object' || action === null) return action; // Return literal like "User is admin"

        // If action is a plain object with no operator keys (e.g., {} or { a: 1 }),
        // it's not a recognized transformation, so return the original value.
        if (Object.keys(action).every(key => !key.startsWith('$'))) return value;

        return value; // Fallback: return original value if action is an unhandled/unknown operator type.
    }
}