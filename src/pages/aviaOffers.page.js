import { parsePrice } from '../helpers/price.helper.js';

export class AviaOffersPage {
    // ТЕХНИЧЕСКОЕ ОПИСАНИЕ СТРАНИЦЫ:
  constructor(page) {
    this.page = page;

    // Кнопка "Следить за ценой"
    this.priceAlertButton = page
      .getByRole('button', { name: 'Следить за' })
      .first();

    // Карточка оффера — признак загрузки выдачи
    this.firstOfferCard = page
      .locator('[data-ti="offer-card"]')
      .first();

    // Цена из 1 оффера  
    this.firstOfferPrice = this.firstOfferCard
      .locator('[data-ti="price"]'); 
    }

    // БИЗНЕСОВЫЕ ДЕЙСТВИЯ СО СТРАНИЦЕЙ:
    // Явное ожидание загрузки выдачи
    async waitForLoaded() {
        await this.firstOfferCard.waitFor({
        timeout: 30000,
        });
    }
    // Проверка видимости кнопки "Следить за ценой"
    async isPriceAlertButtonVisible() {
        await this.waitForLoaded();
        return await this.priceAlertButton.isVisible();
    }
    // Проверка, что в URL указано нужное количество пассажиров
    async hasTravelersCount(count) {
    return new RegExp(`travelers=${count}`).test(this.page.url());
    }
    // Перезагрузка страницы выдачи
    async reload() {
        await this.page.reload();
        await this.waitForLoaded();
    }
    // Получение цены из 1 оффера на выдаче
    async getFirstOfferPrice() {
        await this.waitForLoaded();
        await this.firstOfferPrice.waitFor();

    const priceText = await this.firstOfferPrice.innerText();
    return parsePrice(priceText);
  }
}