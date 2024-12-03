import _ from 'lodash';

export const get = <T = unknown>(object: unknown, path: string | Array<string | number>, defaultValue: T = undefined as T): T => {
    return _.get(object, path, defaultValue);
};

export const set = <T>(object: object, path: string | Array<string | number>, value: unknown): T => {
    return _.set(object, path, value) as T;
};

export const cloneDeep = <T>(object: T): T => {
    return _.cloneDeep(object);
};

export const merge = <T>(object: T, ...sources: unknown[]): T => {
    return _.merge(object, ...sources);
};

export const isEmpty = (value: unknown): boolean => {
    return _.isEmpty(value);
};

export const find = <T>(array: T[], predicate: (value: T) => boolean): T | undefined => {
    return _.find(array, predicate);
};

export const filter = <T>(array: T[], predicate: (value: T) => boolean): T[] => {
    return _.filter(array, predicate);
};
