import { faker } from '@faker-js/faker';

const cities = [
  'Москва',
  'Казань',
  'Сочи',
  'Санкт-Петербург',
];

const otherCities = [
  'Екатеринбург',
  'Новосибирск',
  'Самара',
  'Нижний Новгород',
];

 // Генератор данных для формы поиска
export function generateFlightSearchData() {
  const from = faker.helpers.arrayElement(cities);
  const to = faker.helpers.arrayElement(otherCities);

  const passengers = faker.number.int({ min: 1, max: 5 });

  const flight = {
    from,
    to,
    passengers,
  };

  return flight;
}

