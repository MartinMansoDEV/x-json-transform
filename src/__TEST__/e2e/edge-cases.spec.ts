import {transform} from "../../core/transform";

describe('E2E: Edge Cases', (): void => {
    test('should return default values for missing keys', (): void => {
        const data = {};
        const schema = {
            username: {$get: 'user.name', $default: 'Anonymous'},
            email: {$get: 'user.email', $default: 'unknown@example.com'}
        };

        const result = transform(data, schema);

        expect(result).toEqual({
            username: undefined,
            email: undefined
        });
    });

    test('should handle empty schema gracefully', (): void => {
        const data = {foo: 'bar'};
        const schema = {};

        const result = transform(data, schema);

        expect(result).toEqual({});
    });

    test('should handle empty input data gracefully', (): void => {
        const data = {};
        const schema = {
            someKey: {$get: 'nonexistent', $default: 'defaultValue'}
        };

        const result = transform(data, schema);

        expect(result).toEqual({
            someKey: undefined,
        });
    });
});
