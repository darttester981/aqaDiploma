import { expect } from '@playwright/test';

export class HeaderComponent {
  constructor(page) {
    this.page = page;

    this.logoLink = page.getByRole('link', { name: 'Логотип' });
    this.dealsLink = page.getByRole('link', { name: 'Это выгодно!' });
    this.weekendLink = page.getByRole('link', { name: 'Выходные' });
    this.routesLink = page.getByRole('link', { name: 'Маршруты', exact: true });
    this.posterLink = page.getByRole('link', { name: 'Афиша' });
    this.helpLink = page
      .getByLabel('header')
      .getByRole('link', { name: 'Справочная' });
    this.guideLink = page.getByRole('link', { name: 'Путеводитель', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Войти' });
  }

  async expectNavigationVisible() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.dealsLink).toBeVisible();
    await expect(this.weekendLink).toBeVisible();
    await expect(this.routesLink).toBeVisible();
    await expect(this.posterLink).toBeVisible();
    await expect(this.helpLink).toBeVisible();
    await expect(this.guideLink).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}