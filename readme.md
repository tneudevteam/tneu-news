# @tneu/news [![CircleCI](https://img.shields.io/circleci/project/github/vladgolubev/tneu-news.svg)](https://circleci.com/gh/vladgolubev/tneu-news) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> TNEU News Parser

## Install

```
$ yarn add @tneu/news
```

## Usage

```js
const {parsePage} = require('@tneu/news');

const pages = await parsePage(1);
// returns 15 items per page

// example response
const item = {
  title: 'Запрошуємо молодих науковців, вчених, аспірантів, слухачів магістратури взяти участь у Ювілейній конференції Ради молодих вчених ТНЕУ!',
  description: 'Ювілейна конференція Ради молодих вчених «Економічний і соціальний розвиток України в ХХІ столітті: національна візія та виклики глобалізації» відбудеться 29-30 березня 2018 року за адресою: м. Тернопіль, вул. Львівська, 11а (11 корпус університету).',
  publishedAt: '2018-03-07T16:48:00.000Z',
  topic: 'Новини / Конференції ТНЕУ',
  primaryTopic: 'Новини',
  secondaryTopic: 'Конференції ТНЕУ',
  imageURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/thumbs/1520441232_konferenciia1.jpg',
  newsPageURL: 'http://www.tneu.edu.ua/news/12908-zaproshuiemo-molodyh-naukovciv-vchenyh-aspirantiv-sluhachiv-magistratury-vziaty-uchast-u-yuvileinii-konferencii-rady-molodyh-vchenyh-tneu.html',
  author: 'Відділ інформації та зв\'язків з громадськістю',
  content: 'Ювілейна\nконференція Ради молодих вчених «Економічний і соціальний розвиток України в ХХІ\nстолітті: національна візія та виклики глобалізації» відбудеться 29-30 березня\n2018 року за адресою: м. Тернопіль, вул. Львівська, 11а (11 корпус\nуніверситету).\n\nФорма участі у конференції: очна, заочна.\nРобочі мови конференції: українська, англійська, польська, німецька,\nросійська.\n\nТермін подачі матеріалів для участі у роботі\nконференції – до 19 березня 2018 року включно.\n\nДля того, щоб долучитися до наукового заходу\nнеобхідно:\n1) ознайомитися з інформаційним листом;\n2) до вказаного дедлайну надіслати на поштову скриньку матеріали, заявку та\nкопію квитанції про сплату оргвнеску;\n3) очікувати запрошення на участь у роботі конференції, а також програму\nзаходу.\n\nКонтактна інформація оргкомітету:\nРада молодих\nвчених ТНЕУ\nм.\nТернопіль, вул. Львівська, 11, каб. 1226\n0678966899\n(Онищук Вікторія Олегівна);\n0967424559\n(Шупа Леся Зіновіївна).\ne-mail: tneu.rmv.conf@gmal.com',
  attachments: [{
    url: 'http://www.tneu.edu.ua/engine/download.php?id=5065',
    name: 'Інформаційний лист',
    fileSizeBytes: 311664,
    downloadsCount: 15
  }, {
    url: 'http://www.tneu.edu.ua/engine/download.php?id=5063',
    name: 'Information letter',
    fileSizeBytes: 282869,
    downloadsCount: 3
  }, {
    url: 'http://www.tneu.edu.ua/engine/download.php?id=5064',
    name: 'Заявка на участь',
    fileSizeBytes: 247265,
    downloadsCount: 7
  }],
  images: [{
    fullSizeURL: 'http://www.tneu.edu.ua/uploads/posts/2018-03/1520441232_konferenciia1.jpg',
    thumbnailURL: '/uploads/posts/2018-03/thumbs/1520441232_konferenciia1.jpg'
  }]
}
```

## API

### tneuNews(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## License

MIT © [Vlad Holubiev](https://vladholubiev.com)
