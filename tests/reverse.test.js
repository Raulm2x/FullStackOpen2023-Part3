const reverse = require('../utils/forTesting').reverse

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})

const digits = [1,2,3,4,5,6,7,8,9]

test('sum of all digits', () =>{
    const sum = digits.reduce((num, sum) => num + sum)

    expect(sum).toBe(45)
})