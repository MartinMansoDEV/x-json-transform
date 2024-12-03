import {FilterOperator} from "../../utils/types";

export const filter = (value: unknown, operator: FilterOperator): unknown[] => {
    return Array.isArray(value) ? value.filter(operator.$filter) : [];
}