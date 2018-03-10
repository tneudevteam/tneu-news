const {subDays, startOfDay} = require('date-fns');
const {getPublishedAtDateFromSubtitle} = require('./date');

it('should export getPublishedAtDateFromSubtitle function', () => {
  expect(getPublishedAtDateFromSubtitle).toBeInstanceOf(Function);
});

it(`should return today's date`, () => {
  const date = getPublishedAtDateFromSubtitle('Дата: Сьогодні Новини / Оголошення');
  expect(Date.now() - date.valueOf()).toBeGreaterThanOrEqual(0);
});

it(`should return yesterday's date`, () => {
  const date = getPublishedAtDateFromSubtitle('Дата: Вчора Новини / Оголошення');
  expect(subDays(new Date(), 1) - date.valueOf()).toBeGreaterThanOrEqual(0);
});

it('should return parsed date', () => {
  const date = getPublishedAtDateFromSubtitle('Дата: 7-03-2018, 15:52 Новини / Оголошення');
  expect(new Date('2018-03-07').valueOf() - startOfDay(date.valueOf())).toBeGreaterThanOrEqual(0);
});
