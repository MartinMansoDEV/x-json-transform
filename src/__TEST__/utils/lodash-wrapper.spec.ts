import {cloneDeep, filter, get, isEmpty, merge, set, find} from "../../utils/lodash-wapper";

describe('Lodash Wrapper', (): void => {

    test('get: Should return value from object or default value', (): void => {
        const data = {user: {name: 'John Doe', age: 30}};

        expect(get(data, 'user.name')).toBe('John Doe');

        expect(get(data, 'user.nonExistent', 'default')).toBe('default');
    });

    test('set: Should set a value in the object', (): void => {
        const data = {user: {name: 'John Doe'}};

        const updatedData = set<typeof data>(data, 'user.name', 'Jane Doe');
        expect(updatedData.user.name).toBe('Jane Doe');

        expect(data.user.name).toBe('Jane Doe');
    });

    test('cloneDeep: Should clone an object deeply', (): void => {
        const data = {user: {name: 'John Doe', address: {city: 'New York'}}};

        const clonedData = cloneDeep(data);
        clonedData.user.name = 'Jane Doe';
        clonedData.user.address.city = 'Los Angeles';

        expect(data.user.name).toBe('John Doe');
        expect(data.user.address.city).toBe('New York');
    });

    test('merge: Should deeply merge two objects', (): void => {
        const data1 = {user: {name: 'John Doe', age: 30}};
        const data2 = {user: {address: '123 Street'}};

        const mergedData = <{ user: { name: string, age: number, address: string } }>merge(data1, data2);
        expect(mergedData.user.name).toBe('John Doe');
        expect(mergedData.user.address).toBe('123 Street');
    });

    test('isEmpty: Should check if object is empty', (): void => {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({user: 'John Doe'})).toBe(false);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('find: Should find an element in an array based on a predicate', (): void => {
        const languages = [
            {name: 'JavaScript', isFavorite: true},
            {name: 'Python', isFavorite: false},
            {name: 'Ruby', isFavorite: false},
        ];

        const foundLang = find(languages, lang => lang.isFavorite);
        expect(foundLang?.name).toBe('JavaScript');
    });

    test('filter: Should filter elements based on a predicate', (): void => {
        const languages = [
            {name: 'JavaScript', isFavorite: true},
            {name: 'Python', isFavorite: false},
            {name: 'Ruby', isFavorite: false},
        ];

        const filteredLanguages = <[{ name: string, isFavorite: boolean }]>filter(languages, lang => lang.isFavorite);
        expect(filteredLanguages).toHaveLength(1);
        expect(filteredLanguages[0].name).toBe('JavaScript');
    });
});

