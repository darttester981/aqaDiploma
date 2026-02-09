import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page.js';
import { MainSearch } from '../src/pages/mainSearch.page.js';
import { AviaOffersPage } from '../src/pages/aviaOffers.page.js';
import { generateFlightSearchData } from '../src/helpers/flightSearch.generator.js';

test.describe('Offers page', () => {
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new MainSearch(page);
    const data = generateFlightSearchData();
    data.passengers = 3;

    // Перейти на tutu.ru
    await mainPage.open('/');
    // Перейти на вкладку авиа на главной
    await page.getByRole('button', { name: ' Авиабилеты' }).click();
    // Заполнить все обязательные поля формы и осуществить поиск
    await searchPage.searchFlights(data);
  });

  test('1.Проверка видимости кнопки Следить за ценой на выдаче', async ({ page }) => {
    const aviaOffersPage = new AviaOffersPage(page);

    // Явное ожидание загрузки выдачи
    await aviaOffersPage.waitForLoaded();
    // Проверка видимости кнопки "Следить за ценой"
    await expect(aviaOffersPage.priceAlertButton).toBeVisible();
  });

  test('2.Проверка, что Выдача сохранила количество пассажиров после перезагрузки страницы', async ({
    page,
  }) => {
    const aviaOffersPage = new AviaOffersPage(page);

    // Проверка, что url выдачи содержит указанное ранее кол-во пассажиров
    expect(await aviaOffersPage.hasTravelersCount(3)).toBe(true);
    // Перезагрузка и повторная проверка
    await aviaOffersPage.reload();
    expect(await aviaOffersPage.hasTravelersCount(3)).toBe(true);
  });

  test('3.Цена отображается в карточке и больше 0', async ({ page }) => {
    const aviaOffersPage = new AviaOffersPage(page);
    // Обьявляем переменную с ценой для 1 карточки
    const price = await aviaOffersPage.getFirstOfferPrice();
    // Проверка, что цена > 0
    expect(price).toBeGreaterThan(0);
  });
});
