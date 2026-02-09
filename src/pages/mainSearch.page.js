export class MainSearch {
    // ТЕХНИЧЕСКОЕ ОПИСАНИЕ СТРАНИЦЫ:
  constructor(page) {
    this.page = page;
    // Поля "Откуда" и "Куда"
    this.fromButton = page.getByRole('button', { name: 'Санкт-Петербург' }).first();
    this.toButton = page.getByRole('button', { name: 'Москва' }).nth(1);
    // Дата
    this.tomorrowButton = page.getByRole('button', { name: 'Завтра' }).first();
    // Пассажиры
    this.passengersInput = page.getByRole('textbox', { name: 'Кто летит' });
    this.addPassengerButton = page.getByRole('button', { name: 'Добавить пассажира' });
    // Чекбокс отелей
    this.hotelsCheckbox = page.getByRole('checkbox', {
      name: 'Искать отели в новой вкладке',
    });
    // Кнопка поиска
    this.searchButton = page.getByRole('button', { name: 'Найти авиабилеты' });
  }

    // БИЗНЕСОВЫЕ ДЕЙСТВИЯ СО СТРАНИЦЕЙ:
    // Заполнить "Откуда" и "Куда"
    async selectRoute() {
        await this.fromButton.click();
        await this.toButton.click();
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
    async searchFlights() {
        await this.selectRoute();
        await this.selectTomorrow();
        await this.setPassengers();
        await this.disableHotelSearch();
        await this.submitSearch();
  }

}