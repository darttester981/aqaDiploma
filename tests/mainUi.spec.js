import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page.js';
import { HeaderComponent } from '../src/components/header.component.js';
import { MainSearch } from '../src/pages/mainSearch.page.js';
import { generateFlightSearchData } from '../src/helpers/flightSearch.generator.js';

test.describe('Main page', () => {
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open('/');
  });

  test('1.Проверка отображения элементов навигации хэдера', async ({ page }) => {
    const header = new HeaderComponent(page);
    await header.expectNavigationVisible();
  });

  test('2.Проверка названия элементов навигации хэдера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Это выгодно!' })).toContainText('Это выгодно!');
    await expect(page.getByRole('link', { name: 'Выходные' })).toContainText('Выходные');
    await expect(page.getByRole('link', { name: 'Маршруты', exact: true })).toContainText(
      'Маршруты',
    );
    await expect(page.getByRole('link', { name: 'Афиша' })).toContainText('Афиша');
    await expect(page.getByLabel('header').getByRole('link', { name: 'Справочная' })).toContainText(
      'Справочная',
    );
    await expect(page.getByRole('link', { name: 'Путеводитель', exact: true })).toContainText(
      'Путеводитель',
    );
    await expect(page.getByRole('button', { name: 'Войти' })).toContainText('Войти');
  });

  test('3.Проверка href элементов навигации хэдера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Это выгодно!' })).toHaveAttribute(
      'href',
      'https://www.tutu.ru/juicy-offers/',
    );
    await expect(page.getByRole('link', { name: 'Выходные' })).toHaveAttribute(
      'href',
      'https://www.tutu.ru/weekend/',
    );
    await expect(page.getByRole('link', { name: 'Маршруты', exact: true })).toHaveAttribute(
      'href',
      'https://provereno.tutu.ru/',
    );
    await expect(page.getByRole('link', { name: 'Афиша' })).toHaveAttribute(
      'href',
      'https://www.tutu.ru/afisha/',
    );
    await expect(
      page.getByLabel('header').getByRole('link', { name: 'Справочная' }),
    ).toHaveAttribute('href', 'https://www.tutu.ru/2read/');
    await expect(page.getByRole('link', { name: 'Путеводитель', exact: true })).toHaveAttribute(
      'href',
      'https://www.tutu.ru/geo/',
    );
  });

  test('4.Проверка, что тултип пропадает через 10 секунд', async ({ page }) => {
    
    // Заполнить обязательные поля формы поиска Откуда и Куда
    await page.getByRole('button', { name: 'Санкт-Петербург' }).first().click();
    await page.getByRole('button', { name: 'Москва' }).nth(1).click();
    // Проверка, что поле Куда не заполнено
    await expect(page.locator('[data-ti="trip-dates"]')).toHaveValue('');
    // Клик по кнопке Найти билеты
    await page.getByRole('button', { name: 'Найти авиабилеты' }).click();
    // Тултип отображается
    await expect(page.locator('[data-ti="tooltip"]')).toBeVisible();
    await expect(page.locator('[data-ti="tooltip"]')).toHaveText('Выберите дату вылета');
    // Тултип не отображается спустя 10 сек
    await expect(page.locator('[data-ti="tooltip"]')).toBeHidden({ timeout: 10000 });
  });

  test('5.Вариант предыдущего теста с ручным заполнением полей', async ({ page }) => {
    const search = new MainSearch(page);
    const data = generateFlightSearchData();

    await search.fillRoute(data);
    await expect(page.locator('[data-ti="trip-dates"]')).toHaveValue('');
    await page.getByRole('button', { name: 'Найти авиабилеты' }).click();
    await expect(page.locator('[data-ti="tooltip"]')).toBeVisible();
  });
});
