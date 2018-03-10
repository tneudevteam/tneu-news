jest.mock('./fetch');

const {readFileSync} = require('fs');
const {resolve} = require('path');
const {getPageHTML} = require('./fetch');
const {parsePage} = require('.');

beforeAll(() => {
  const mockHtml = readFileSync(resolve(__dirname, './news-list.mock.html'));
  getPageHTML.mockReturnValue(mockHtml);
});

it('should export parsePage function', () => {
  expect(parsePage).toBeInstanceOf(Function);
});
