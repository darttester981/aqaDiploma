import { faker } from '@faker-js/faker';

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Сочи',
  'Екатеринбург',
  'Новосибирск',
  'Самара',
  'Нижний Новгород',
];

/**
 * Генератор данных для формы поиска авиабилетов на tutu.ru
 * Возвращает "валидные" города из списка (чтобы тесты меньше флапали).
 */
export function generateFlightSearchData() {
  const from = faker.helpers.arrayElement(cities);
  // "Куда" — только из остальных городов, чтобы не совпало с "Откуда"
  const otherCities = cities.filter((city) => city !== from);
  const to = faker.helpers.arrayElement(otherCities);

  const passengers = faker.number.int({ min: 1, max: 5 });

  const flight = {
    from,
    to,
    passengers,
  };

  return flight;
}

