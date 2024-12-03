import {ActionType, TransformOperator} from "../../utils/types";
import {ActionApplier} from "../../core/action-applier";
import {apply, filter, find, mapper, pipe} from "../../core/operators";


jest.mock('../../core/operators', () => ({
    apply: jest.fn(),
    filter: jest.fn(),
    find: jest.fn(),
    mapper: jest.fn(),
    pipe: jest.fn(),
}));

describe('ActionApplier', (): void => {
    const mockValue = 'mockValue';

    beforeEach((): void => {
        jest.clearAllMocks();
    });

    test('apply: Should call apply when action has $apply', (): void => {
        const action: ActionType = {$apply: (value: unknown) => `Applied ${value}`};
        ActionApplier.apply(mockValue, action);

        expect(apply).toHaveBeenCalledWith(mockValue, action);
    });

    test('apply: Should call filter when action has $filter', (): void => {
        const action: ActionType = {$filter: jest.fn()};
        ActionApplier.apply(mockValue, action);

        expect(filter).toHaveBeenCalledWith(mockValue, action);
    });

    test('apply: Should call find when action has $find', (): void => {
        const action: ActionType = {$find: jest.fn()};
        ActionApplier.apply(mockValue, action);

        expect(find).toHaveBeenCalledWith(mockValue, action);
    });

    test('apply: Should call mapper when action has $mapper', (): void => {
        const action: ActionType = {$mapper: {key: 'mappedValue'}};
        ActionApplier.apply(mockValue, action);

        expect(mapper).toHaveBeenCalledWith(mockValue, action);
    });

    test('apply: Should call pipe when action has $pipe', (): void => {
        const action: ActionType = {$pipe: [jest.fn() as TransformOperator]};
        ActionApplier.apply(mockValue, action);

        expect(pipe).toHaveBeenCalledWith(mockValue, action);
    });

    test('apply: Should return value if no matching action type is found', (): void => {
        const action: ActionType = {};
        const result = ActionApplier.apply(mockValue, action);

        expect(result).toBe(mockValue);
    });
});
