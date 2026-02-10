import { test, expect } from '../src/helpers/fixtures/fixture.js';
import { generateFlightSearchData } from '../src/helpers/flightSearch.generator.js';

test.describe('Main page', () => {
  test.beforeEach(async ({ app }) => {
    await app.mainPage.open('/');
  });

  test('1.Проверка отображения элементов навигации хэдера', async ({ app }) => {
    await app.header.expectNavigationVisible();
  });

  test('2.Проверка названия элементов навигации хэдера', async ({ app }) => {
    await app.header.expectNavigationHasCorrectText();
  });

  test('3.Проверка href элементов навигации хэдера', async ({ app }) => {
    await app.header.expectNavigationHasCorrectHrefs();
  });

  test('4.Проверка, что тултип пропадает через 10 секунд', async ({ app }) => {
    await app.mainSearch.switchToAviaTab();
    await app.mainSearch.selectQuickRoute();
    await app.mainSearch.expectDatesEmpty();
    await app.mainSearch.submitSearch();
    await app.mainSearch.expectTooltipVisible('Выберите дату вылета');
    await app.mainSearch.expectTooltipHidden();
  });

  test('5.Вариант предыдущего теста с ручным заполнением полей с генератором', async ({ app }) => {
    const data = generateFlightSearchData();

    await app.mainSearch.switchToAviaTab();
    await app.mainSearch.fillRoute(data);
    await app.mainSearch.expectDatesEmpty();
    await app.mainSearch.submitSearch();
    await app.mainSearch.expectTooltipVisible('Выберите дату вылета');
  });
});
