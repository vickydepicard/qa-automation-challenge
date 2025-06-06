import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

test.describe('Form Validation', () => {

  test('TC01 - Submit with valid mandatory fields', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();

    await form.fillMandatoryFields({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd123',
      confirmPassword: 'P@ssw0rd123',
    });

    await form.submit();

    // Screenshot pour preuve visuelle
    await page.screenshot({ path: 'after-submit.png', fullPage: true });

    // Pause manuelle pour analyse
    await page.pause();
  });
 


});
