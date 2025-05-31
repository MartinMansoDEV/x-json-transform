import {ActionType, PipeOperator, TransformOperator} from "../../utils/types";
import {ActionApplier} from "../action-applier";
// Removed unused: import {get} from "../../utils/lodash-wapper";

export const pipe = (value: unknown, operator: PipeOperator): unknown => {
    // Each step in the pipe operates on the accumulated value from the previous step.
    // ActionApplier.apply is responsible for handling what each step action means.
    return operator.$pipe.reduce((currentValue: unknown, step: TransformOperator): unknown => {
        return ActionApplier.apply(currentValue, step as ActionType);
    }, value);
}