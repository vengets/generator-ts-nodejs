import { sum } from '../src/sum';

test('should return correct sum', () => {
    expect (sum(1,2)).toBe(3);
})

test('should not return incorrect sum', () => {
    expect (sum(1,2)).not.toBe(4);
})
