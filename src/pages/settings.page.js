export class SettingsPage {
    constructor (page) {
        this.page = page;
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
        this.profileName = page.locator('.dropdown-toggle');
    }

        async changeBio(text) {  
        await this.bioInput.click();
        await this.bioInput.fill(text);

        await this.updateSettingsButton.click();  
    }

        async changeName(name) {  
        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.updateSettingsButton.click();  
    }
}