import {transform} from "../../core/transform";

describe('E2E: Basic Transform', (): void => {
    const data = {
        user: {
            profileName: 'Martin',
            profileSurname: 'Manso'
        },
        url: 'http://github.com/MartinMansoDEV',
        languages: [
            {name: 'Python', isFavorite: false},
            {name: 'JavaScript', isFavorite: true}
        ]
    };

    const schema = {
        name: {$get: 'user.profileName'},
        surname: {$get: 'user.profileSurname'},
        country: {$default: 'Spain'},
        'gitHub.url': {$get: 'url'},
    };

    test('should transform data correctly based on schema', (): void => {
        const result = transform(data, schema);

        expect(result).toEqual({
            name: 'Martin',
            surname: 'Manso',
            country: 'Spain',
            gitHub: {
                url: 'http://github.com/MartinMansoDEV',
            }
        });
    });
});
