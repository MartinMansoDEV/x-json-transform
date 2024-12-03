import {find} from "../../../core/operators";
import {FindOperator} from "../../../utils/types";

describe('find function', (): void => {
    const data = [
        {name: 'JavaScript', isFavorite: true},
        {name: 'Python', isFavorite: false},
        {name: 'Ruby', isFavorite: false}
    ];

    test('should find the first element that matches the condition', (): void => {
        const action = {$find: (lang: { isFavorite: boolean }): boolean => lang.isFavorite};
        const result = find(data, action as FindOperator);

        expect(result).toEqual({name: 'JavaScript', isFavorite: true});
    });

    test('should return undefined if the value can not be found', (): void => {
        const action = {$find: (lang: { name: string }): boolean => lang.name === 'random'};
        const result = find(data, action as FindOperator);

        expect(result).toBeUndefined();
    });
});
