import {ActionType, PipeOperator, TransformOperator} from "../../utils/types";
import {ActionApplier} from "../action-applier";
import {get} from "../../utils/lodash-wapper";

export const pipe = (value: unknown, operator: PipeOperator): unknown => {
    return operator.$pipe.reduce((currentValue: unknown, step: TransformOperator): unknown => {
        const nextValue = '$get' in step ? get(currentValue, step.$get) : currentValue;
        return ActionApplier.apply(nextValue, step as ActionType);
    }, value);
}