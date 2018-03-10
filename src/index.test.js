const {parsePage} = require('.');

it('should export parsePage function', () => {
  expect(parsePage).toBeInstanceOf(Function);
});
