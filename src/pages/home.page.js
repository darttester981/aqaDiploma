import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.profileName = page.locator('.dropdown-toggle');
    this.articleCreateLink = page.locator('a', { hasText: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  // бизнесовые действия со страницей

  // кликаем по локатору
  async clickArticleCreateLink() {
    await this.articleCreateLink.click();               
  }
  async gotoSettings() {
    await this.profileName.click();
    await this.settingsLink.click();
  
  }  

  async logOut() {
    await this.profileName.click();
    await this.logoutLink.click();
    }

   getProfileNameLocator() {
    return this.profileName;
  }
}

