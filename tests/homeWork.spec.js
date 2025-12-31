import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/home.page.js';
import { MainPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/main.page.js';
import { RegisterPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/register.page.js';
import { AuthorizationPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/authorization.page.js';
import { ArticleCreatePage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/articleCreate.page.js';
import { ArticleViewPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/articleView.page.js';
import { TagPage } from '../src/pages/tag.page';
import { SettingsPage } from '/Users/glushenkovdd/QaGuru/HomeWorkPageObject/src/pages/settings.page.js';


const baseUrl = 'https://realworld.qa.guru/';

// Логин отдельной функцией
async function login(page, baseUrl, email, password, userName) {
  const mainPage = new MainPage(page);
  const authorizationPage = new AuthorizationPage(page);
  const homePage = new HomePage(page);

  // Открываем главную страницу
  await mainPage.open(baseUrl);
  // Переходим на страницу авторизации
  await mainPage.gotoLogin();
  // Аутентифицируемся
  await authorizationPage.authorize(email, password);
  // Проверяем, что пользователь авторизован
  // await homePage.getProfileNameLocator(userName);
  await homePage.getProfileNameLocator().waitFor({ state: 'visible', timeout: 10000 });
  await expect(homePage.getProfileNameLocator()).toContainText(userName, { timeout: 10000 });
}

// Регистрация отдельной функцией
async function register(page) {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

 const user = {
    email: faker.internet.email({ provider: 'qa.guru' }),
    name: faker.person.fullName(), 
    password: faker.internet.password({ length: 10 })
    }; 
  
  // Открываем главную страницу
  await mainPage.open(baseUrl);
  // Переходим на страницу регистрации
  await mainPage.gotoRegister();
  // Заполняем поля регистрации
  await registerPage.register(user.name, user.email, user.password);

  return user;
  }





test.describe('5 тестов', () => {

test('1.Проверка имени авторизованного юзера', async ({ page }) => {
  const homePage = new HomePage(page);
  const mainPage = new MainPage(page);
  const user = await register(page);

  await expect(homePage.profileName).toBeVisible();
  await expect(homePage.profileName).toHaveText(user.name);
});

 test('2.Фильтрация статей по тегу', async ({ page }) => {
  const mainPage = new MainPage(page);
  const tagPage = new TagPage(page);
  const user = await register(page);

  await tagPage.firstTagClick();

  await expect(page.getByRole('button', { name: ' реклама' })).toBeVisible();
});


test('3.Создание статьи', async ({ page }) => {
  const homePage = new HomePage(page);
  const mainPage = new MainPage(page)
  const articleCreatePage = new ArticleCreatePage(page);
  const articleViewPage = new ArticleViewPage(page);

  const user = await register(page);

  // переменные для создания статьи
  let title = faker.lorem.sentence();
  let description = faker.lorem.paragraph();
  let body = faker.lorem.paragraphs(3);
  let tags = '123';

  // Переходим на страницу создания статьи
  await homePage.clickArticleCreateLink();
  // Заполняем поля статьи
  await articleCreatePage.createAndPublishArticle(title, description, body, tags);
  // Клик по кнопке создания статьи
  await homePage.clickArticleCreateLink()
  // Проверяем, что статья создана
  await expect(articleViewPage.articleTitle).toBeVisible();
  await expect(articleViewPage.articleTitle).toHaveText(title);
  });

test('4.(Через логин) Измененение и сохранение краткой инфо о юзере', async ({ page }) => {
  const mainPage = new MainPage(page);    
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  let textBio = faker.lorem.paragraph();

  // Первичный логин
  await login(page, baseUrl, 'test12345@mail.ru', '123456', 'Dany321')
  // Переходим на страницу настроек пользователя
  await homePage.gotoSettings();
  // Вводим текст в поле краткой инфо
  await settingsPage.changeBio(textBio);
  // Разлогиниваемся
  await homePage.logOut();
  // Повторный логин
  await login(page, baseUrl, 'test12345@mail.ru', '123456', 'Dany321')

  await expect(settingsPage.bioInput).toHaveValue(textBio);
});

// была инфровая ошибка, не проходил логин под существующим юзером, поэтому дублирую тест через регистрацию нового юзера
test('4.1.(Через регистрацию) Измененение и сохранение краткой инфо о юзере', async ({ page }) => {
  const mainPage = new MainPage(page);    
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  const user = await register(page);
  let textBio = faker.lorem.paragraph();

  // Переходим на страницу настроек пользователя
  await homePage.gotoSettings();
  // Вводим текст в поле краткой инфо
  await settingsPage.changeBio(textBio);
  // Переход в раздел Arcticle
  await homePage.clickArticleCreateLink();
  // Переход обратно на страницу настроек пользователя
  await homePage.gotoSettings();

  await expect(settingsPage.bioInput).toHaveValue(textBio);
});


test('5.Измененение и сохранение имени юзера', async ({ page }) => {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const settingsPage = new SettingsPage(page);

    const newUserName = faker.person.fullName(); 

    await register(page);
    await homePage.gotoSettings();
    await settingsPage.changeName(newUserName);
    await expect(homePage.getProfileNameLocator()).toContainText(newUserName);
});

});