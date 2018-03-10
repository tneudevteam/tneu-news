jest.mock('./fetch');

const {readFileSync} = require('fs');
const {resolve} = require('path');
const {getNewsArticlePageHTML} = require('./fetch');
const {parseArticle} = require('./article');

const mockHtmlAttachments = readFileSync(resolve(__dirname, './article-attachments.mock.html'));
const mockHtmlGallery = readFileSync(resolve(__dirname, './article-gallery.mock.html'));

beforeAll(() => {
  getNewsArticlePageHTML.mockReturnValue(mockHtmlAttachments);
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

it('should return array of gallery images', async () => {
  getNewsArticlePageHTML.mockReturnValueOnce(mockHtmlGallery);
  const {images} = await parseArticle('');

  expect(images).toEqual([
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408763_slaid1.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408763_slaid1.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408711_slaid2.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408711_slaid2.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408743_slaid3.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408743_slaid3.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408763_slaid4.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408763_slaid4.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408756_slaid5.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408756_slaid5.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408698_slaid6.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408698_slaid6.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408753_slaid7.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408753_slaid7.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408703_slaid8.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408703_slaid8.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408678_slaid9.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408678_slaid9.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408724_slaid10.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408724_slaid10.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408680_slaid11.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408680_slaid11.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408724_slaid12.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408724_slaid12.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408754_slaid13.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408754_slaid13.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408687_slaid14.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408687_slaid14.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408691_slaid15.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408691_slaid15.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408740_slaid16.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408740_slaid16.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408750_slaid17.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408750_slaid17.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408752_slaid18.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408752_slaid18.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408769_slaid19.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408769_slaid19.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408735_slaid20.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408735_slaid20.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408712_slaid21.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408712_slaid21.jpg'
    },
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520408736_slaid22.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520408736_slaid22.jpg'
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
