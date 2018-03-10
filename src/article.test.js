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

it('should return array of article attachments', async () => {
  const {attachments} = await parseArticle('');
  expect(attachments).toEqual([
    {
      url: 'http://www.tneu.edu.ua/engine/download.php?id=5065',
      name: 'Інформаційний лист',
      fileSizeBytes: 311664,
      downloadsCount: 12
    },
    {
      url: 'http://www.tneu.edu.ua/engine/download.php?id=5063',
      name: 'Information letter',
      fileSizeBytes: 282869,
      downloadsCount: 3
    },
    {
      url: 'http://www.tneu.edu.ua/engine/download.php?id=5064',
      name: 'Заявка на участь',
      fileSizeBytes: 247265,
      downloadsCount: 5
    }
  ]);
});

it('should return article content', async () => {
  const {content} = await parseArticle('');
  expect(content).toEqual(
    `Ювілейна
конференція Ради молодих вчених «Економічний і соціальний розвиток України в ХХІ
столітті: національна візія та виклики глобалізації» відбудеться 29-30 березня
2018 року за адресою: м. Тернопіль, вул. Львівська, 11а (11 корпус
університету).

Форма участі у конференції: очна, заочна.
Робочі мови конференції: українська, англійська, польська, німецька,
російська.

Термін подачі матеріалів для участі у роботі
конференції – до 19 березня 2018 року включно.

Для того, щоб долучитися до наукового заходу
необхідно:
1) ознайомитися з інформаційним листом;
2) до вказаного дедлайну надіслати на поштову скриньку матеріали, заявку та
копію квитанції про сплату оргвнеску;
3) очікувати запрошення на участь у роботі конференції, а також програму
заходу.

Контактна інформація оргкомітету:
Рада молодих
вчених ТНЕУ
м.
Тернопіль, вул. Львівська, 11, каб. 1226
0678966899
(Онищук Вікторія Олегівна);
0967424559
(Шупа Леся Зіновіївна).
e-mail: tneu.rmv.conf@gmal.com`
  );
});
