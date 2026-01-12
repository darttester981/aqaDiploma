import { expect } from '@playwright/test';

export class SettingsPage {
    constructor (page) {
        this.page = page;
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.bioInput = page.getByPlaceholder('Short bio about you');
        this.profileName = page.locator('.dropdown-toggle');
    }

    // Изменить краткое инфо о юзере
        async changeBio(text) {  
        await this.bioInput.click();
        await this.bioInput.fill(text);
            await expect(this.bioInput).toContainText(text);

        await this.updateSettingsButton.click();  
    }
    // Изменить имя пользователя
        async changeName(name) {  
        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.updateSettingsButton.click();  
    }
}
