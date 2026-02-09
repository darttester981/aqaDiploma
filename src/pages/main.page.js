export class MainPage {
  // ТЕХНИЧЕСКОЕ ОПИСАНИЕ СТРАНИЦЫ:
  constructor(page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: 'Логотип' });
    this.valueLink = page.getByRole('link', { name: 'Это выгодно!' });
    this.weekendLink = page.getByRole('link', { name: 'Выходные' });
    this.destinyLink = page.getByRole('link', { name: 'Маршруты', exact: true });
    this.afishaLink = page.getByRole('link', { name: 'Афиша' });
    this.referenceLink = page.getByLabel('header').getByRole('link', { name: 'Справочная' });
    this.guideLink = page.getByRole('link', { name: 'Путеводитель', exact: true });
    this.loginLink = page.getByRole('button', { name: 'Войти' });
  }

  // БИЗНЕСОВЫЕ ДЕЙСТВИЯ СО СТРАНИЦЕЙ:
  // переходы на страницы
  async gotoMain() {
    await this.logoLink.click();
  }

  // открыть страницу
  async open(url = '/') {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  
  // async open(url) {
  //   await this.page.goto(url, {
  //     waitUntil: 'domcontentloaded',
  //   });

    
}

