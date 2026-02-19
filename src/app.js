import { MainPage } from './pages/main.page.js';
import { MainSearch } from './pages/mainSearch.page.js';
import { AviaOffersPage } from './pages/aviaOffers.page.js';
import { HeaderComponent } from './components/header.component.js';

/**
 * Класс App - фасад для доступа ко всем Page Objects
 */
export class App {
  constructor(page) {
    this.page = page;
    
    // Инициализация всех страниц
    this.mainPage = new MainPage(page);
    this.mainSearch = new MainSearch(page);
    this.aviaOffersPage = new AviaOffersPage(page);
    
    // Инициализация компонентов
    this.header = new HeaderComponent(page);
  }
}
