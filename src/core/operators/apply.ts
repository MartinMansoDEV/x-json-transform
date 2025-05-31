import {ApplyOperator} from "../../utils/types";
import { get } from "../../utils/lodash-wapper";

export const apply = (context: unknown, operator: ApplyOperator): unknown => {
    const { $apply: func, $get: getterPath } = operator;
    // If a getterPath is provided, resolve the value from the context using that path.
    // Otherwise, use the context itself as the value.
    const valueToProcess = getterPath ? get(context, getterPath) : context;
    return func(valueToProcess);
}