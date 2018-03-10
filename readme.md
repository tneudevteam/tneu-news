# @tneu/news [![CircleCI](https://img.shields.io/circleci/project/github/tneudevteam/tneu-news.svg)](https://circleci.com/gh/tneudevteam/tneu-news) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> TNEU News Parser

## Install

```
$ yarn add @tneu/news
```

## Usage

```js
const {parsePage} = require('@tneu/news');

const page = await parsePage(1); // returns {pageNumber, totalPages, items}
```

And the object in `items` array looks like:

![](https://user-images.githubusercontent.com/3817380/37247418-47d25a0a-24c3-11e8-9651-ce7fb9c27c1a.png)

## License

MIT © [Vlad Holubiev](https://vladholubiev.com)
