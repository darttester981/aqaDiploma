import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../src/pages/home.page.js';
import { MainPage } from '../src/pages/main.page.js';
import { RegisterPage } from '../src/pages/register.page.js';
import { AuthorizationPage } from '../src/pages/authorization.page.js';

const user = {
  email: faker.internet.email({ provider: 'qa.guru' }),
  name: faker.person.fullName(), // 'Allen Brown'
  password: faker.internet.password({ length: 10 }),
  method() {},
};

const url = 'https://realworld.qa.guru/';

test('Регистрация нового юзера', async ({ page }) => {
  const { email, name, password } = user;

  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);

  await mainPage.open(url);
  await mainPage.gotoRegister();
  await registerPage.register(name, email, password);

  await expect(homePage.profileName).toContainText(user.name);
});

const user1 = {
  email: 'glushenkov1994@inbox.ru',
  password: '123456',
  method() {},
};

test('Авторизация', async ({ page }) => {
  const { email, password } = user1;

  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);
  const authorizationPage = new AuthorizationPage(page);

  await mainPage.open(url);
  await mainPage.gotoLogin();
  await authorizationPage.authorize(email, password);

  await expect(homePage.profileName).toContainText('Dany748');
});
