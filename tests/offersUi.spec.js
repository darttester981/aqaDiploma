import { test, expect } from '../src/helpers/fixtures/fixture.js';
import { generateFlightSearchData } from '../src/helpers/flightSearch.generator.js';

test.describe('Offers page', () => {
  test.beforeEach(async ({ app, page }) => {
    const data = generateFlightSearchData();
    data.passengers = 3;

    // Перейти на tutu.ru
    await app.mainPage.open('/');
    // Перейти на вкладку авиа на главной
    await page.getByRole('button', { name: ' Авиабилеты' }).click();
    // Заполнить все обязательные поля формы и осуществить поиск
    await app.mainSearch.searchFlights(data);
  });

  test('1.Проверка видимости кнопки Следить за ценой на выдаче', async ({ app }) => {
    // Явное ожидание загрузки выдачи
    await app.aviaOffersPage.waitForLoaded();
    // Проверка видимости кнопки "Следить за ценой"
    await expect(app.aviaOffersPage.priceAlertButton).toBeVisible();
  });

  test('2.Проверка, что Выдача сохранила количество пассажиров после перезагрузки страницы', async ({ app }) => {
    // Проверка, что url выдачи содержит указанное ранее кол-во пассажиров
    expect(await app.aviaOffersPage.hasTravelersCount(3)).toBe(true);
    // Перезагрузка и повторная проверка
    await app.aviaOffersPage.reload();
    expect(await app.aviaOffersPage.hasTravelersCount(3)).toBe(true);
  });

  test('3.Цена отображается в карточке и больше 0', async ({ app }) => {
    // Обьявляем переменную с ценой для 1 карточки
    const price = await app.aviaOffersPage.getFirstOfferPrice();
    // Проверка, что цена > 0
    expect(price).toBeGreaterThan(0);
  });
});
