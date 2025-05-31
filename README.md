# 🔧 X JSON Transform

[![npm version](https://badge.fury.io/js/x-json-transform.svg)](https://badge.fury.io/js/x-json-transform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

"Transforming JSON data doesn't have to feel like untangling holiday lights. 🎄"

Meet **X JSON Transform**, the library that turns messy data into beautifully structured results. Effortless,
clean, and kind of fun. (Yes, really.)

---

## 🚀 Why Use X JSON Transform?

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

Here's how to use X JSON Transform in three easy steps:

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

Define what you want the result to look like with a X schema:

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

- `$if`: Conditional logic to determine which value or transformation to apply.
  - **Purpose**: Allows you to introduce branching logic into your transformations based on a condition.
  - **Syntax**: An object with three properties:
    - `condition`: An expression or value. If it's an object containing other transformation operators (e.g., `{ $get: 'path.to.field' }`, `{ $get: 'path', $apply: (val) => val > 10 }`), it will be processed, and its result will be evaluated for truthiness. Otherwise, the literal value of `condition` is used.
    - `then`: The value or transformation object to use if the `condition` evaluates to a truthy value.
    - `else`: The value or transformation object to use if the `condition` evaluates to a falsy value.
  - **Evaluation**:
    - The `condition` is evaluated. Standard JavaScript truthiness/falsiness rules apply (e.g., `false`, `0`, `""`, `null`, `undefined`, `NaN` are falsy; everything else is truthy).
    - If the `condition` is truthy, the `then` branch is processed.
    - If the `condition` is falsy, the `else` branch is processed.
  - **Branches**: Both `then` and `else` can be:
    - A literal value (e.g., a string, number, boolean, array, or object).
    - Another transformation object (e.g., `{ $get: 'another.path' }`, `{ $apply: (val) => val * 2 }`, or even another nested `$if`).

  **Examples**:

  1.  **Simple boolean condition**:
      ```typescript
      const schema = {
        statusText: {
          $if: {
            condition: true, // Direct boolean
            then: "Active",
            else: "Inactive"
          }
        }
      };
      // With any input data, result will be: { statusText: "Active" }
      ```

  2.  **Condition using `$get`**:
      ```typescript
      const data = { user: { isLoggedIn: false, name: "Guest" } };
      const schema = {
        greeting: {
          $if: {
            condition: { $get: 'user.isLoggedIn' },
            then: { $get: 'user.name', $apply: (name: string) => `Welcome, ${name}!` },
            else: "Welcome, Guest!"
          }
        }
      };
      // result will be: { greeting: "Welcome, Guest!" }
      ```

  3.  **Nested transformation in `then` branch**:
      ```typescript
      const data = { item: { type: "food", price: 10, quantity: 2 } };
      const schema = {
        itemValue: {
          $if: {
            condition: { $get: 'item.type', $apply: (type: string) => type === "food" },
            then: { $get: 'item', $apply: (item: any) => item.price * item.quantity }, // Nested $apply
            else: 0
          }
        }
      };
      // result will be: { itemValue: 20 }
      ```

  4.  **`$if` used inside a `$mapper`**:
      ```typescript
      const data = {
        items: [
          { name: "Apple", type: "fruit", price: 1 },
          { name: "Shirt", type: "clothing", price: 20 },
          { name: "Banana", type: "fruit", price: 0.5 }
        ]
      };
      const schema = {
        processedItems: {
          $get: 'items',
          $mapper: { // Applies to each item in the 'items' array
            description: {
              $if: {
                condition: { $get: 'type', $apply: (type: string) => type === 'fruit' },
                then: { $get: 'name', $apply: (name: string) => `${name} (Fruit)` },
                else: { $get: 'name', $apply: (name: string) => `${name} (Non-Fruit)` }
              }
            },
            price: { $get: 'price' }
          }
        }
      };
      /*
      result will be:
      {
        "processedItems": [
          { "description": "Apple (Fruit)", "price": 1 },
          { "description": "Shirt (Non-Fruit)", "price": 20 },
          { "description": "Banana (Fruit)", "price": 0.5 }
        ]
      }
      */
      ```

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

Install X JSON Transform today and say goodbye to messy JSON transformations forever.

> Warning: Overuse may cause excessive joy.
> Side effects include cleaner code, fewer bugs, and a strong urge to refactor everything.



