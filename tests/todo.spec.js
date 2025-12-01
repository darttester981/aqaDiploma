import { test, expect } from '@playwright/test';

test('Аноним может создать задачу', async ({ page }) => {
  // Предусловие
  await page.goto('https://todomvc.com/examples/vue/dist/#/');
  // Шаги
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('йоу йоу тыц тыц');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByText('йоу йоу тыц тыц').click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  // Проверки
  await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('йоу йоу тыц тыц');
});
