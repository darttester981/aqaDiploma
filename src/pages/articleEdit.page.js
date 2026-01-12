import { expect } from '@playwright/test';

export class ArticleEditPage {
    // техническое описание страницы
    
    constructor(page) {
        this.page = page;
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder("What's this article about?");
        this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.tagInput = page.getByPlaceholder('Enter tags');
        this.updateButton = page.getByRole('button', { name: 'Update Article' })
    }

     // Заполнение полей при создании статьи
  
    async fillArticleFields(title, description, body, tags) {

        // Заполняем Заголовок статьи
        await this.titleInput.fill(title);
        await expect(this.titleInput).toHaveValue(title);

        // Заполняем Описание статьи
        await this.descriptionInput.fill(description);
        await expect(this.descriptionInput).toHaveValue(description);

        // Заполняем Содержание статьи
        await this.bodyInput.fill(body);
        await expect(this.bodyInput).toHaveValue(body);

        // Заполняем Тэги
        await this.tagInput.fill(tags);
        await expect(this.tagInput).toHaveValue(tags);
    }

    // Нажимаем кнопку "Update Article"
     
    async clickUpdateButton() {
        await this.updateButton.click();
    }

    // Редактирование и сохранение статьи
     // Объединяет заполнение полей и сохранение статьи
    
    async editAndUpdateArticle(title, description, body, tags) {
        
        // Заполняем все поля статьи
        await this.fillArticleFields(title, description, body, tags);
        
        // Публикуем статью
        await this.clickUpdateButton();
        
        // Ждем загрузки страницы после обновления
        await this.page.waitForLoadState('domcontentloaded');
    }
}