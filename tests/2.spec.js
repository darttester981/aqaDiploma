import { test, expect } from '@playwright/test';

test('Пользователь может заказать бургер', async ({ page }) => {
  await page.goto('file:///Users/glushenkovdd/Downloads/burger-order(1).html');
  await page.getByPlaceholder('Введите ваше имя').click();
  await page.getByText('Горчица').click();
  await page.locator('#burgerType').selectOption('vegan');
  await page.locator('.radio-group', { hasText: 'Большой' }).click();
  await page.locator("[placeholder='Введите ваше имя']").fill('wowowow');
  //await page.locator('switch-label').click();
  await page.getByText('+').click();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  //Проверка
  await expect(page.getByText('Заказ принят!')).toBeVisible();
});
