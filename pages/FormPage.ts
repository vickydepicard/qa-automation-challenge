import { Page } from '@playwright/test';

export class FormPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://qa-assessment.pages.dev/');
  }

  async fillMandatoryFields(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.page.fill('#firstName', data.firstName);
    await this.page.fill('#lastName', data.lastName);
    await this.page.fill('#email', data.email);
    await this.page.fill('#password', data.password);
    await this.page.fill('#confirmPassword', data.confirmPassword);
  }

  async disableNativeValidation() {
    await this.page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) form.setAttribute('novalidate', 'true');
    });
  }

  async submit() {
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    await submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await submitButton.click();
  }

  async getErrorMessages() {
    return this.page.locator('.error-message, [role="alert"], .invalid-feedback').allTextContents();
  }
}
