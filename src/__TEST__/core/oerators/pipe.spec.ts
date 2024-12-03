import {pipe} from "../../../core/operators";

describe('pipe function', (): void => {
    const mockValue = 'testValue';

    test('should apply a series of transformations in sequence', (): void => {
        const action = {
            $pipe: [
                {$apply: (value: unknown) => `Hello, ${value}`},
                {$apply: (value: unknown) => `${value} World!`}
            ]
        };

        const result = pipe(mockValue, action);
        expect(result).toBe('Hello, testValue World!');
    });
});
