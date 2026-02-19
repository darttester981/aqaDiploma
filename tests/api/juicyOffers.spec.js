import { test, expect } from '@playwright/test';
import { generateTransportType } from '../../src/helpers/flightSearch.generator.js';
import { JuicyOffersService } from '../../src/services/juicyOffers.service.js';

test.describe('API Тесты поиска городов tutu.ru', () => {
  let service;

  test.beforeEach(({ request }) => {
    service = new JuicyOffersService(request);
  });

  test('Успешное олучение списка городов для авиа 200', async () => {
    const response = await service.getOffers('ptt');
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('hits');
    expect(responseBody.hits).toHaveProperty('hits');
    expect(Array.isArray(responseBody.hits.hits)).toBe(true);
    expect(responseBody.hits.hits.length).toBeGreaterThan(0);
  });

  test('Успешное получение городов для поездов 200', async () => {
    const response = await service.getOffers('train');
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.hits).toBeDefined();
    expect(Array.isArray(responseBody.hits.hits)).toBe(true);
  });

  test('Получение городов со случайным типом транспорта из генератора 200', async () => {
    const transport = generateTransportType();

    const response = await service.getOffers(transport);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.hits).toBeDefined();
    expect(responseBody.hits.hits.length).toBeGreaterThan(0);
  });

  test('Проверка структуры данных города', async () => {
    const transport = generateTransportType();

    const response = await service.getOffers(transport);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('hits');

    // Проверяем структуру первого города
    if (responseBody.hits.hits.length > 0) {
      const firstCity = responseBody.hits.hits[0]._source;
      expect(firstCity).toHaveProperty('name');
      expect(firstCity).toHaveProperty('geo_id');
      expect(firstCity).toHaveProperty('iata_city_code');
      expect(firstCity.name).toBeTruthy();
    }
  });

  test('Запрос без параметра transport возвращает города 200', async () => {
    const response = await service.getOffersWithoutParams();
    const responseBody = await response.json();

    // В ответе приходят данные даже без параметра transport
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('hits');
    expect(responseBody.hits.hits.length).toBeGreaterThan(0);
  });
});
