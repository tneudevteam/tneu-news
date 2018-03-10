jest.mock('./fetch');

const {readFileSync} = require('fs');
const {resolve} = require('path');
const {getNewsArticlePageHTML} = require('./fetch');
const {parseArticle} = require('./article');

beforeAll(() => {
  const mockHtml = readFileSync(resolve(__dirname, './article.mock.html'));
  getNewsArticlePageHTML.mockReturnValue(mockHtml);
});

it('should export parseArticle function', () => {
  expect(parseArticle).toBeInstanceOf(Function);
});

it('should call getNewsArticlePageHTML w/ page url', async () => {
  await parseArticle('some-url');
  expect(getNewsArticlePageHTML).toBeCalledWith('some-url');
});

it('should return article author', async () => {
  const {author} = await parseArticle('');
  expect(author).toEqual(`Відділ інформації та зв'язків з громадськістю`);
});
