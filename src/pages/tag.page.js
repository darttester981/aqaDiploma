export class TagPage {
  constructor(page) {
    this.page = page;
    this.reclameTag = page.getByRole('button', { name: 'реклама' });
    this.filterTag = page.getByRole('button', { name: ' реклама' })
  }

  // клик по первому тегу
  async firstTagClick() {
    await this.reclameTag.click();
  }
}