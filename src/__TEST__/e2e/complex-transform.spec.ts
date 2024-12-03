import {transform} from "../../core/transform";

describe('E2E: Complex Transform', (): void => {
    const data = {
        users: [
            {isMain: true, name: 'Jane Doe'},
            {isMain: false, name: 'John Doe'}
        ],
        orders: [
            {status: 'shipped', items: [{name: 'pen', value: 1}, {name: 'mouse', value: 20}]},
            {status: 'pending', items: [{name: 'headset', value: 200}, {name: 'mouse', value: 20}]},
            {status: 'pending', items: [{name: 'bottle', value: 10}, {name: 'mouse', value: 20}]},
        ]
    };

    const schema = {
        mainUser: {
            $get: 'users', $pipe: [
                {$find: ({isMain}: { isMain: boolean }): boolean => isMain},
                {$get: 'name'}
            ],
        },
        firstOrderStatus: {
            $get: 'orders[0].status', $mapper: {shipped: 'SHIPPED', pending: 'PENDING'}
        },
        nOrdersSent: {
            $get: 'orders', $pipe: [
                {$filter: ({status}: { status: string }): boolean => status === 'shipped'},
                {$apply: (orders: { status: string }[]): number => orders.length}
            ],
        },
        'firstOrder.items': {
            $get: 'orders[0].items',
        }

    };

    test('should transform complex data correctly', (): void => {
        const result = transform(data, schema);

        expect(result).toEqual({
            mainUser: 'Jane Doe',
            nOrdersSent: 1,
            firstOrderStatus: 'SHIPPED',
            firstOrder: {items: [{name: 'pen', value: 1}, {name: 'mouse', value: 20}]}
        });
    });
});
