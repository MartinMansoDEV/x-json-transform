import {mapper} from "../../../core/operators";

describe('mapper function', (): void => {
    const action = {$mapper: {JavaScript: 'JS', Python: 'Py'}};

    test('should map the value using a mapping object', (): void => {
        const result = mapper('JavaScript', action);

        expect(result).toBe('JS');
    });

    test('should return the original value if no mapping is found', (): void => {
        const result = mapper('Python', action);

        expect(result).toBe('Py');
    });

    test('should should return undefined if the value does not exists', (): void => {
        const result = mapper('Random', action);

        expect(result).toBeUndefined();
    });
});
