import {apply} from "../../../core/operators";

describe('apply function', (): void => {
    const mockValue = 'testValue';

    test('should apply a function to the value', (): void => {
        const action = {$apply: (value: unknown) => `Applied ${value}`};
        const result = apply(mockValue, action);

        expect(result).toBe('Applied testValue');
    });
});
