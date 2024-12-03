import {MapperOperator} from "../../utils/types";

export const mapper = (value: unknown, operator: MapperOperator): unknown => {
    return operator.$mapper[value as string | number] || undefined;
}