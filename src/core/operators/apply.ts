import {ApplyOperator} from "../../utils/types";

export const apply = (value: unknown, operator: ApplyOperator): unknown => {
    return operator.$apply(value);
}