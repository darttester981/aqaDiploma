import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.profileName = page.locator('.dropdown-toggle');
    this.articleCreateLink = page.locator('a', { hasText: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.editArtickleLink = page.getByRole('link', { name: ' Edit Article' });
  }

  // бизнесовые действия со страницей

  // кликаем по локатору
  async clickArticleCreateLink() {
    await this.articleCreateLink.click();               
  }

  // переход в настройки
  async gotoSettings() {
    await this.profileName.click();
    await this.settingsLink.click();
  
  }  
  // разлогин
  async logOut() {
    await this.profileName.click();
    await this.logoutLink.click();
    }
  // получение имени юзера
   getProfileNameLocator() {
    return this.profileName;
  }

  // переход в редактирование статьи
  async gotoEditArticle() {
  await this.editArtickleLink.nth(1).click();
  }  

}

