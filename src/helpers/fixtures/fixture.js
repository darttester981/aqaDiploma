import { test as base } from '@playwright/test';
import { App } from '../../app.js';

export const test = base.extend({

  // Архитектурный слой
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

});

// Экспортируем expect для удобства
export { expect } from '@playwright/test';
