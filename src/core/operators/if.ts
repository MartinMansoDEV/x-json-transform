import { IfOperator, ActionType, Object as DataObject } from '../../utils/types';
import { ActionApplier } from '../action-applier';

function isAction(value: unknown): value is ActionType {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  // Crude check, can be improved by checking for specific operator keys
  const keys = Object.keys(value as DataObject);
  return keys.some(key => key.startsWith('$'));
}

export function handleIf(data: unknown, operator: IfOperator['$if']): unknown {
  let conditionResult: unknown;
  if (isAction(operator.condition)) {
    conditionResult = ActionApplier.apply(data, operator.condition as ActionType);
  } else {
    conditionResult = operator.condition;
  }

  if (conditionResult) {
    if (isAction(operator.then)) {
      return ActionApplier.apply(data, operator.then as ActionType);
    }
    return operator.then;
  } else {
    if (isAction(operator.else)) {
      return ActionApplier.apply(data, operator.else as ActionType);
    }
    return operator.else;
  }
}
