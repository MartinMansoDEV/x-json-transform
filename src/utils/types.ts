export type Object = Record<string | number, unknown>;

export type ActionBase = { $get?: string };
export type ApplyOperator = ActionBase & { $apply: (value: unknown) => unknown; };
export type FilterOperator = ActionBase & { $filter: (item: unknown) => boolean };
export type FindOperator = ActionBase & { $find: (item: unknown) => boolean };
export type MapperOperator = ActionBase & { $mapper: Object };
export type PipeOperator = ActionBase & { $pipe: Array<TransformOperator> };

export type TransformOperator = ApplyOperator | FilterOperator | FindOperator | MapperOperator | PipeOperator | ActionBase;

export type ActionType =
    | { $default: unknown }
    | ActionBase
    | ApplyOperator
    | FilterOperator
    | FindOperator
    | MapperOperator
    | PipeOperator;

export interface Schema {
    [key: string]: ActionType;
}