import { expect } from '@playwright/test';

export class MainPage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;

    this.signupLink = page.getByRole('link', { name: 'Sign up' });

    this.loginLink = page.getByRole('link', { name: 'Login' })};

  
  // бизнесовые действия со страницей

  async gotoLogin() {
    this.loginLink.click();
  }

  async gotoRegister() {
    this.signupLink.click();
  }


  async open(url) {
    await this.page.goto(url);
  }
}

