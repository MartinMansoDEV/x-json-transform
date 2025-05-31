export type Object = Record<string | number, unknown>;

export type ActionBase = { $get?: string };
export type ApplyOperator = ActionBase & { $apply: (value: unknown) => unknown; };
export type FilterOperator = ActionBase & { $filter: (item: unknown) => boolean };
export type FindOperator = ActionBase & { $find: (item: unknown) => boolean };
export type MapperOperator = ActionBase & { $mapper: Object };
export type PipeOperator = ActionBase & { $pipe: Array<TransformOperator> };
export type IfOperator = ActionBase & { $if: { condition: unknown, then: unknown, else: unknown } };

export type TransformOperator = ApplyOperator | FilterOperator | FindOperator | MapperOperator | PipeOperator | IfOperator | ActionBase;

export type ActionType =
    | { $default: unknown }
    | ActionBase
    | ApplyOperator
    | FilterOperator
    | FindOperator
    | MapperOperator
    | PipeOperator
    | IfOperator;

export interface Schema {
    [key: string]: ActionType;
}