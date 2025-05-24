# 🔧 Simple JSON Transform

[![npm version](https://badge.fury.io/js/x-json-transform.svg)](https://badge.fury.io/js/x-json-transform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

"Transforming JSON data doesn't have to feel like untangling holiday lights. 🎄"

Meet **Simple JSON Transform**, the library that turns messy data into beautifully structured results. Effortless,
clean, and kind of fun. (Yes, really.)

---

## 🚀 Why Use Simple JSON Transform?

- 💡 **Simple**: Use a schema to describe your transformations. No more manual mapping!
- 🔗 **Powerful**: Chain transformations with `$pipe` like a data wizard. 🧙‍♂️
- 🛠 **Customizable**: Need something special? Add your own custom logic.
- ✅ **TypeScript Ready**: Types so strong, they lift your bugs away.

---

## 📦 Installation

You know what to do:

```bash
npm install x-json-transform
# Or, for the yarn enthusiasts:
yarn add x-json-transform
```

---

## ⚡ Quick Start

Here's how to use Simple JSON Transform in three easy steps:

### 1. Your Data

Imagine you've got this glorious JSON blob:

```typescript
const data = {
    accounts: [{
        profileName: 'Martin',
        profileSurname: 'Manso',
    }],
    url: 'http://github.com/MartinMansoDEV',
    languages: [
        {name: 'Python', isFavorite: false},
        {name: 'JavaScript', isFavorite: true},
    ],
};
```

### 2. Your Schema

Define what you want the result to look like with a simple schema:

```typescript
const schema: Schema = {
    name: {$get: 'accounts[0].profileName'},
    surname: {$get: 'accounts[0].profileSurname'},
    'gitHub.url': {$get: 'url'},
    'gitHub.userName': {
        $get: 'url',
        $apply: (url: string): string => url.replace('http://github.com/', ''),
    },
    favoriteLang: {
        $get: 'languages',
        $pipe: [
            {$find: ({isFavorite}: { isFavorite: boolean }): boolean => isFavorite},
            {$get: 'name'},
        ],
    },
};
```

### 3. Transform Like a Boss 😎

```typescript
import {transform} from 'x-json-transform';

const result = transform(data, schema);
console.log(result);

```

The Result? Magic. ✨

```json
{
  "name": "Martin",
  "surname": "Manso",
  "gitHub": {
    "url": "http://github.com/MartinMansoDEV",
    "userName": "MartinMansoDEV"
  },
  "favoriteLang": "JavaScript"
}

```

---

## 🧙 Key Features

- `$get`: Grab values using a path. Example: `{ $get: 'user.profileName' }` or `{ $get: 'accounts[0].name' }`

- `$apply`: The final method, apply custom logic.
  Example: `{ $apply: (url) => url.toUpperCase() }`

- `$pipe`: Chain transformations like a pro.
  Example: `{ $pipe: [ { $find: {...} }, { $get: 'name' } ] }`

- `$default`: Define fallback values (for when life gives you undefined or you just want to set a default value ).
  Example: `{ $default: 'N/A' }`

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

A few guidelines:
- Ensure your code adheres to the existing style.
- Write tests for new features or bug fixes.
- Keep commit messages clear and descriptive.

---

## 🎉 Ready to Simplify Your Life?

Install Simple JSON Transform today and say goodbye to messy JSON transformations forever.

> Warning: Overuse may cause excessive joy.
> Side effects include cleaner code, fewer bugs, and a strong urge to refactor everything.



