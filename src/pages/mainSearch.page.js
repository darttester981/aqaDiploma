import { expect } from '@playwright/test';

export class MainSearch {
    // ТЕХНИЧЕСКОЕ ОПИСАНИЕ СТРАНИЦЫ:
  constructor(page) {
    this.page = page;
    // Поля "Откуда" и "Куда"
    this.fromInput = page.getByRole('textbox', { name: 'Откуда' });
    this.toInput = page.getByRole('textbox', { name: 'Куда', exact: true });
    // Кнопки с названиями городо для быстрого заполнения инпута
    this.cityFromSPb = page.getByRole('button', { name: 'Санкт-Петербург' }).first();
    this.cityToMoscow = page.getByRole('button', { name: 'Москва' }).nth(1);
    // Кнопка завтра для заполнения инпута с датой
    this.tomorrowButton = page.getByRole('button', { name: 'Завтра' }).first();
    // Поле с датой Когда
    this.tripDatesInput = page.locator('[data-ti="trip-dates"]');
    // Пассажиры
    this.passengersInput = page.getByRole('textbox', { name: 'Кто летит' });
    this.addPassengerButton = page.getByRole('button', { name: 'Добавить пассажира' });
    // Чекбокс отелей
    this.hotelsCheckbox = page.getByRole('checkbox', {
      name: 'Искать отели в новой вкладке',
    });
    // Кнопка поиска
    this.searchButton = page.getByRole('button', { name: 'Найти авиабилеты' });
    // Кнопка перехода на вкладку авиа на главной странице
    this.aviaTab = page.getByRole('button', { name: ' Авиабилеты' });
    // Тултип ошибки 
    this.tooltip = page.locator('div').filter({ hasText: 'Выберите дату вылета' }).nth(1);
  }


    // БИЗНЕСОВЫЕ ДЕЙСТВИЯ СО СТРАНИЦЕЙ:

    // Переключиться на авиа таб
    async switchToAviaTab() {
      await this.aviaTab.click();
  }

    // Заполнить "Откуда" и "Куда" по кнопке с названием города
    async selectQuickRoute() {
      await this.cityFromSPb.click();
      await this.cityToMoscow.click();
  }
    // Заполнить маршрут (Откуда и Куда) вручную
    async fillRoute({ from, to }) {
      await this.fillFrom(from);
      await this.fillTo(to);
  }

    async fillFrom(city) {
      await this.fromInput.click();
      await this.fromInput.clear(); // Сначала очистить
      await this.fromInput.pressSequentially(city, { delay: 100 }); // Медленный ввод
      await this.page.keyboard.press('Escape');
  }

    async fillTo(city) {
      await this.toInput.click();
      await this.toInput.clear();
      await this.toInput.pressSequentially(city, { delay: 100 });
      await this.page.keyboard.press('Escape');
  }
    
    // Убедиться, что поле даты пустое
    async expectDatesEmpty() {
      await expect(this.tripDatesInput).toHaveValue('');
  }

    // Проверить, что тултип отображается с нужным текстом
    async expectTooltipVisible(expectedText) {
      await expect(this.tooltip).toBeVisible();
      await expect(this.tooltip).toHaveText(expectedText);
  }

    // Проверить, что тултип скрыт (с настраиваемым таймаутом 10 сек)
    async expectTooltipHidden(timeout = 10000) {
      await expect(this.tooltip).toBeHidden({ timeout });
  }

    // Выбрать дату "Завтра"
    async selectTomorrow() {
        await this.tomorrowButton.click();
  }
    // Добавить пассажиров (по умолчанию будет 3)
    async setPassengers(count = 3) {
        await this.passengersInput.click();

        for (let i = 1; i < count; i++) {
        await this.addPassengerButton.click();
        }
  }
    // Снять флаг "Искать отели в новой вкладке"
    async disableHotelSearch() {
        if (await this.hotelsCheckbox.isChecked()) {
        await this.hotelsCheckbox.uncheck();
        }
  }
    // Нажать "Найти авиабилеты"
    async submitSearch() {
        await this.searchButton.click();
  }

    // Полный сценарий поиска (для beforeEach)
    async searchFlights({ from, to, passengers = 3 } = {}) {
    // Если переданы города, то заполняем вручную
      if (from && to) {
        await this.fillRoute({ from, to });
      } else {
   // Иначе используем быстрый выбор Спб-Москва
        await this.selectQuickRoute();
      }
      
      await this.selectTomorrow();
      await this.setPassengers(passengers);
      await this.disableHotelSearch();
      await this.submitSearch();
  }

}