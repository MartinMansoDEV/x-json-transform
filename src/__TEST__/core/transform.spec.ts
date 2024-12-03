import {transform} from "../../core/transform";

describe('Transform Function', (): void => {

    const data = {
        user: {
            profileName: 'Martin',
            profileSurname: 'Manso',
        },
        url: "http://github.com/MartinMansoDEV",
        languages: [
            {name: 'Python', isFavorite: false},
            {name: 'JavaScript', isFavorite: true},
        ],
    };

    const schema = {
        name: {$get: 'user.profileName'},
        surname: {$get: 'user.profileSurname'},
        'gitHub.url': {$get: 'url'},
        'gitHub.userName': {
            $get: 'url',
            $apply: (url: string) => url.replace('http://github.com/', '')
        },
        favoriteLang: {
            $get: 'languages',
            $pipe: [
                {$find: (lang: { isFavorite: boolean }) => lang.isFavorite},
                {$get: 'name'},
            ],
        },
    };

    test('transform: Should transform data according to the schema', (): void => {
        const result = <{
            name: string,
            surname: string,
            gitHub: { url: string, userName: string },
            favoriteLang: string
        }>transform(data, schema);

        expect(result.name).toBe('Martin');
        expect(result.surname).toBe('Manso');
        expect(result.gitHub.url).toBe('http://github.com/MartinMansoDEV');
        expect(result.gitHub.userName).toBe('MartinMansoDEV');
        expect(result.favoriteLang).toBe('JavaScript');
    });

});
