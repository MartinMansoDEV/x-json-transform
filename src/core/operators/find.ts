import {FindOperator} from "../../utils/types";

export const find = (value: unknown, operator: FindOperator): unknown => {
    return Array.isArray(value) ? value.find(operator.$find) : undefined;
}