import { transform } from '../../../core/transform';
import { IfOperator, Schema, Object as DataObject } from '../../../utils/types';

describe('transform with $if operator', () => {
  const data: DataObject = {
    user: {
      name: 'John Doe',
      age: 30,
      isAdmin: true,
      isGuest: false,
    },
    status: 'active',
  };

  // Test case 1: Truthy condition, simple value in 'then'
  it('should return "then" branch for a truthy condition with simple value', () => {
    const schema: Schema = {
      result: {
        $if: {
          condition: { $get: 'user.isAdmin' },
          then: 'User is admin',
          else: 'User is not admin',
        },
      } as IfOperator, // Type assertion for the specific action
    };
    const result = transform<{ result: string }>(data, schema);
    expect(result.result).toBe('User is admin');
  });

  // Test case 2: Falsy condition, simple value in 'else'
  it('should return "else" branch for a falsy condition with simple value', () => {
    const schema: Schema = {
      result: {
        $if: {
          condition: { $get: 'user.isGuest' },
          then: 'User is guest',
          else: 'User is not guest',
        },
      } as IfOperator,
    };
    const result = transform<{ result: string }>(data, schema);
    expect(result.result).toBe('User is not guest');
  });

  // Test case 3: Truthy condition, nested transformation in 'then'
  it('should process nested transformation in "then" for a truthy condition', () => {
    const schema: Schema = {
      result: {
        $if: {
          condition: { $get: 'status' }, // 'active' is truthy
          then: { $get: 'user.name' },
          else: 'Status is inactive',
        },
      } as IfOperator,
    };
    const result = transform<{ result: string }>(data, schema);
    expect(result.result).toBe('John Doe');
  });

  // Test case 4: Falsy condition, nested transformation in 'else'
  it('should process nested transformation in "else" for a falsy condition', () => {
    const schema: Schema = {
      result: {
        $if: {
          condition: { $get: 'nonExistentField' }, // undefined is falsy
          then: 'Field exists',
          else: { $get: 'user.age' },
        },
      } as IfOperator,
    };
    const result = transform<{ result: number }>(data, schema);
    expect(result.result).toBe(30);
  });

  // Test case 5: Condition is a direct boolean true
  it('should return "then" branch when condition is true', () => {
    const schema: Schema = {
        result: {
            $if: {
                condition: true,
                then: "Condition is true",
                else: "Condition is false"
            }
        } as IfOperator
    };
    const result = transform<{ result: string }>(data, schema);
    expect(result.result).toBe("Condition is true");
  });

  // Test case 6: Condition using an $apply operator in condition
  it('should evaluate condition involving an $apply operator', () => {
    const schema: Schema = {
      result: {
        $if: {
          condition: { $get: 'user.age', $apply: (age: unknown) => (age as number) > 18 },
          then: 'Adult',
          else: 'Minor',
        },
      } as IfOperator,
    };
    const result = transform<{ result: string }>(data, schema);
    expect(result.result).toBe('Adult');
  });

});
