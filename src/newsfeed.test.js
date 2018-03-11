jest.mock('./fetch');
jest.mock('./article');

const {readFileSync} = require('fs');
const {resolve} = require('path');
const _ = require('lodash');
const {getNewsFeedPageHTML} = require('./fetch');
const {parseArticle} = require('./article');
const {parsePage} = require('./newsfeed');

const mockArticle = {
  author: `Відділ інформації та зв'язків з громадськістю`,
  content:
    'Ювілейна\nконференція Ради молодих вчених «Економічний і соціальний розвиток України в ХХІ\nстолітті:',
  attachments: [
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
  ],
  images: [
    {
      fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520441232_konferenciia1.jpg',
      thumbnailURL: '/uploads/posts/2018-03/thumbs/1520441232_konferenciia1.jpg'
    }
  ]
};

beforeAll(() => {
  const mockHtml = readFileSync(resolve(__dirname, './test-html/newsfeed.mock.html'));
  getNewsFeedPageHTML.mockReturnValue(mockHtml);
  parseArticle.mockReturnValue(mockArticle);
});

beforeEach(() => {
  parseArticle.mockClear();
});

it('should export parsePage function', () => {
  expect(parsePage).toBeInstanceOf(Function);
});

it('should return pageNumber of parsed page', async () => {
  const news = await parsePage(1);
  expect(news.pageNumber).toEqual(1);
});

it('should return hasPrevious boolean', async () => {
  const news = await parsePage(1);
  expect(news.hasPrevious).toEqual(false);
});

it('should return hasNext boolean', async () => {
  const news = await parsePage(1);
  expect(news.hasNext).toEqual(true);
});

it('should return number of total pages', async () => {
  const news = await parsePage(1);
  expect(news.totalPages).toEqual(508);
});

it('should return list of 15 parsed news from page', async () => {
  const news = await parsePage(1);
  expect(news.items).toHaveLength(15);
});

it('should call parseArticle 15 times for each item', async () => {
  await parsePage(1);
  expect(parseArticle).toHaveBeenCalledTimes(15);
});

it('should return news array in valid format', async () => {
  const news = await parsePage(1);

  // hack to avoid cumbersome dates in this test which are tested above
  const newsWithoutDates = _.map(news.items, i => _.omit(i, 'publishedAt'));

  expect(newsWithoutDates).toEqual([
    {
      title: 'Зі святом весни, дорогі жінки!',
      description:
        'Весна – це завше час нових надій і сподівань, час, коли пробуджується природа, огортаючи все навкруги теплом і яскравими фарбами. Варто лише трохи зачекати і ясні сонячні промені будуть тішити нас й заряджати позитивним настроєм, додаючи життєвої енергії та бадьорості.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520415669_267b2322.jpg',
      topic: 'Новини',
      primaryTopic: 'Новини',
      secondaryTopic: '',
      newsPageURL: 'http://www.tneu.edu.ua/news/12904-zi-sviatom-vesny-dorogi-zhinky.html',
      ...mockArticle
    },
    {
      title:
        'Запрошуємо молодих науковців, вчених, аспірантів, слухачів магістратури взяти участь у Ювілейній конференції Ради молодих вчених ТНЕУ!',
      description:
        'Ювілейна конференція Ради молодих вчених «Економічний і соціальний розвиток України в ХХІ столітті: національна візія та виклики глобалізації» відбудеться 29-30 березня 2018 року за адресою: м. Тернопіль, вул. Львівська, 11а (11 корпус університету).',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520441232_konferenciia1.jpg',
      topic: 'Новини / Конференції ТНЕУ',
      primaryTopic: 'Новини',
      secondaryTopic: 'Конференції ТНЕУ',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12908-zaproshuiemo-molodyh-naukovciv-vchenyh-aspirantiv-sluhachiv-magistratury-vziaty-uchast-u-yuvileinii-konferencii-rady-molodyh-vchenyh-tneu.html',
      ...mockArticle
    },
    {
      title: 'Запрошуємо на арт-зустріч «НеФормат»!',
      description:
        'Закінчилися студентські канікули, тож арт-зустрічі «НеФормат» відкривають новий сезон. Відділ гуманітарної освіти та виховання чекає на творчу молодь університету 13 березня о 17.00 год. у виставковій залі ТНЕУ (центральний корпус).',
      imageURL:
        'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520440823_24_mic_contest_2012.jpg',
      topic: 'Новини / Оголошення',
      primaryTopic: 'Новини',
      secondaryTopic: 'Оголошення',
      newsPageURL: 'http://www.tneu.edu.ua/news/12907-zaproshuiemo-na-art-zustrich-neformat.html',
      ...mockArticle
    },
    {
      title: 'До уваги студентів груп 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17!',
      description:
        'Повідомляємо, що 19-22 березня 2018 року відбудуться Збори академічної громади студентів груп 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 по обранню виборних представників із числа студентів для участі у виборах ректора ТНЕУ, що мають відбутися 25 квітня 2018 року.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520439878_769.jpg',
      topic: 'Новини / Оголошення',
      primaryTopic: 'Новини',
      secondaryTopic: 'Оголошення',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12906-do-uvagy-studentiv-grup-1-2-3-4-6-7-8-9-10-11-12-13-14-15-16-17.html',
      ...mockArticle
    },
    {
      title:
        'Запрошуємо до участі у ІІ етапі Всеукраїнської студентської олімпіади зі спеціальності «Менеджмент організацій і адміністрування»',
      description:
        'На виконання наказу Міністерства освіти і науки України № 1572 від 06.12.2017 р. «Про проведення Всеукраїнської студентської олімпіади у 2017/2018 навчальному році» на базі Тернопільського національного економічного університету 25-27 квітня 2018 р. відбудеться II етап Всеукраїнської студентської олімпіади зі спеціальності «Менеджмент організацій і адміністрування» (за видами економічної діяльності).',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-02/thumbs/1518002102_olimpiada.jpg',
      topic: 'Новини / Олімпіади',
      primaryTopic: 'Новини',
      secondaryTopic: 'Олімпіади',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12790-zaproshuiemo-do-uchasti-u-ii-etapi-vseukrainskoi-studentskoi-olimpiady-zi-specialnosti-menedzhment-organizacii-i-administruvannia.html',
      ...mockArticle
    },
    {
      title:
        'До уваги штатних працівників, які не є науковими, науково-педагогічними та педагогічними працівниками, груп 1, 2, 4, 5!',
      description:
        'Повідомляємо, що 19-20 березня 2018 року відбудуться Загальні збори трудового колективу штатних працівників, які не є науковими, науково-педагогічними та педагогічними працівниками, груп 1, 2, 4, 5 по обранню виборних представників із числа штатних працівників ТНЕУ, які не є науковими, науково-педагогічними і педагогічними працівниками, для участі у виборах ректора ТНЕУ, що мають відбутися 25 квітня 2018 року.',
      imageURL:
        'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520438119_yak-zakinchiti-list.jpg',
      topic: 'Новини / Оголошення',
      primaryTopic: 'Новини',
      secondaryTopic: 'Оголошення',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12905-do-uvagy-shtatnyh-pracivnykiv-iaki-ne-ie-naukovymy-naukovo-pedagogichnymy-ta-pedagogichnymy-pracivnykamy-grup-1-2-4-5.html',
      ...mockArticle
    },
    {
      title: 'До уваги студентів!',
      description:
        'Центр підготовки офіцерів запасу розпочинає набір на навчання на військовій кафедрі Національної академії сухопутних військ. Студентів, котрі виявили бажання проходити військову підготовку на військовій кафедрі, просимо ознайомитися з правилами конкурсного відбору, переліком необхідних документів, а також термінами їх подачі на сайті ТНЕУ ЦПОЗ або за адресою: Микулинецька 46а, каб. 604.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520410052_1245.jpg',
      topic: 'Новини / Оголошення',
      primaryTopic: 'Новини',
      secondaryTopic: 'Оголошення',
      newsPageURL: 'http://www.tneu.edu.ua/news/12903-do-uvagy-studentiv.html',
      ...mockArticle
    },
    {
      title:
        '«Конкурентоспроможність вітчизняних підприємств-надавачів послуг громадського транспорту: актуальні проблеми та європейський досвід їх вирішення»',
      description:
        'Колектив кафедри підприємництва, торгівлі та маркетингу ТНЕУ запрошує усіх бажаючих до участі у роботі І Всеукраїнської науково-практичної конференції студентів, аспірантів та молодих вчених «Конкурентоспроможність вітчизняних підприємств-надавачів послуг громадського транспорту: актуальні проблеми та європейський досвід їх вирішення», яка відбудеться 19-20 квітня 2018 р. у Тернопільському національному економічному університеті.',
      imageURL:
        'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520409190_konferenci_resized.jpg',
      topic: 'Новини / Конференції ТНЕУ',
      primaryTopic: 'Новини',
      secondaryTopic: 'Конференції ТНЕУ',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12902-konkurentospromozhnist-vitchyznianyh-pidpryiemstv-nadavachiv-poslug-gromadskogo-transportu-aktualni-problemy-ta-ievropeiskyi-dosvid-ih-vyrishennia.html',
      ...mockArticle
    },
    {
      title: '7 березня',
      description:
        'Найнеприємніший факт стосовно Всесвіту полягає не в тому, що він налаштований вороже, а в тому що йому байдуже (Стенлі Кубрик)',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520408756_slaid5.jpg',
      topic: 'Новини / Цей день в історії',
      primaryTopic: 'Новини',
      secondaryTopic: 'Цей день в історії',
      newsPageURL: 'http://www.tneu.edu.ua/news/12901-7-bereznia.html',
      ...mockArticle
    },
    {
      title: '«Облік, оподаткування і контроль: сучасний стан та напрями розвитку»',
      description:
        'Шановні колеги! Запрошуємо Вас взяти участь у Всеукраїнській науково-практичній інтернет-конференції «Облік, оподаткування і контроль: сучасний стан та напрями розвитку», яка відбудеться 22 березня 2018 р. у Черкаському інституті ДВНЗ «Університет банківської справи».',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520408682_conf3.jpg',
      topic: 'Новини / Конференції в Україні та закордоном',
      primaryTopic: 'Новини',
      secondaryTopic: 'Конференції в Україні та закордоном',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12900-oblik-opodatkuvannia-i-kontrol-suchasnyi-stan-ta-napriamy-rozvytku.html',
      ...mockArticle
    },
    {
      title:
        'Відбулася 14 Міжнародна конференція «Advanced Trends in Radioelectronics, Telecommunications and Computer Engineering (TCSET’2018)»',
      description:
        'Упродовж 20-24 лютого 2018 р. в смт Славське Львівської області відбулася 14 Міжнародна конференція «Advanced Trends in Radioelectronics, Telecommunications and Computer Engineering (TCSET)». Головна мета конференції – представлення нових результатів досліджень, нових тенденцій у науці і техніці, обмін науковими ідеями.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520408195_main.jpg',
      topic: 'Новини',
      primaryTopic: 'Новини',
      secondaryTopic: '',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12899-vidbulasia-14-mizhnarodna-konferenciia-advanced-trends-in-radioelectronics-telecommunications-and-computer-engineering-tcset2018.html',
      ...mockArticle
    },
    {
      title: 'Відбулося засідання організаційного комітету з проведення виборів ректора ТНЕУ',
      description:
        'Шостого березня 2018 р. відбулося чергове засідання організаційного комітету з проведення виборів ректора Тернопільського національного економічного університету.',
      imageURL:
        'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520353311_pexels-photo-302423.jpeg',
      topic: 'Новини',
      primaryTopic: 'Новини',
      secondaryTopic: '',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12897-vidbulosia-zasidannia-organizaciinogo-komitetu-z-provedennia-vyboriv-rektora-tneu.html',
      ...mockArticle
    },
    {
      title:
        'У Республіці Польща відкрито Міжнародний центр освіти та розвитку ТНЕУ й Інституту європейської інтеграції',
      description:
        'Шостого березня 2018 р. Тернопільським національним економічним університетом спільно з Інститутом європейської інтеграції у Варшаві під патронатом Посольства України в Польщі та Тернопільської обласної державної адміністрації було створено Міжнародний центр освіти та розвитку.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520359364_dsc_6427.jpg',
      topic: 'Новини',
      primaryTopic: 'Новини',
      secondaryTopic: '',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12898-u-respublici-polscha-vidkryto-mizhnarodnyi-centr-osvity-ta-rozvytku-tneu-i-instytutu-ievropeiskoi-integracii.html',
      ...mockArticle
    },
    {
      title:
        'До уваги студентів груп 5, 20, 21 та штатних працівників, які не є науковими, науково-педагогічними і педагогічними працівниками, групи 3!',
      description:
        'Повідомляємо, що 16 березня 2018 року відбудуться Збори академічної громади студентів груп 5, 20, 21 та Загальні збори трудового колективу крупи 3 по обранню виборних представників із числа студентів та штатних працівників, які не є науковими, науково-педагогічними і педагогічними працівниками, для участі у виборах ректора Тернопільського національного економічного університету, що відбудуться 25 квітня 2018 року.',
      imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520351919_659597.jpg',
      topic: 'Новини',
      primaryTopic: 'Новини',
      secondaryTopic: '',
      newsPageURL:
        'http://www.tneu.edu.ua/news/12896-do-uvagy-studentiv-grup-5-20-21-ta-shtatnyh-pracivnykiv-iaki-ne-ie-naukovymy-naukovo-pedagogichnymy-i-pedagogichnymy-pracivnykamy-grupy-3.html',
      ...mockArticle
    },
    {
      title: 'Вітаємо!',
      description:
        'Упродовж 2-4 березня у м. Луцьк проходив Кубок України з боротьби самбо. Щиро вітаємо студентку факультету фінансів (група ФМСм-11) ТНЕУ Акопян Алвард, яка здобула срібну нагороду у ваговій категорії 52 кг.',
      imageURL:
        'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520334936_image-0-02-05-870.jpg',
      topic: 'Новини / Спорт',
      primaryTopic: 'Новини',
      secondaryTopic: 'Спорт',
      newsPageURL: 'http://www.tneu.edu.ua/news/12895-vitaiemo.html',
      ...mockArticle
    }
  ]);
});
