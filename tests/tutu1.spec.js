import { test, expect } from '@playwright/test';

test('Появляется подсказка заполнить обязательное поле "Куда"', async ({ page }) => {
  // Предусловие
  await page.goto('https://www.tutu.ru/');
  // Шаги
  await page.getByRole('textbox', { name: 'Откуда' }).click();
  await page.getByRole('textbox', { name: 'Откуда' }).fill('Москва');
  await page.getByRole('textbox', { name: 'Когда' }).click();
  await page.getByRole('gridcell', { name: 'Fri Nov 21' }).click();
  await page.getByRole('button', { name: 'Выбрать' }).click();
  await page.getByRole('button', { name: 'Найти авиабилеты' }).click();
  // Проверка
  await expect(page.locator('body')).toContainText('Выберите город прилёта');
});
