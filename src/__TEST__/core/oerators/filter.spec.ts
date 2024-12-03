import {filter} from "../../../core/operators";
import {FilterOperator} from "../../../utils/types";

describe('filter function', (): void => {
    const data = [
        {name: 'JavaScript', isFavorite: true},
        {name: 'Python', isFavorite: false},
        {name: 'Ruby', isFavorite: false}
    ];

    test('should filter an array based on a condition', (): void => {
        const action = {$filter: (lang: { isFavorite: boolean }): boolean => lang.isFavorite};
        const result = <[{ name: string }]>filter(data, action as FilterOperator);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('JavaScript');
    });

    test('should return undefined if you try to filter a non array property', (): void => {
        const action = {$filter: (lang: { name: string }): boolean => lang.name === 'random'};
        const result = <[]>filter(data, action as FilterOperator);

        expect(result).toHaveLength(0);
    });
});
