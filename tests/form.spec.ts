import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

test.describe('Form Validation', () => {

  test('TC01 - Submit with valid mandatory fields', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();

    //  Fill all mandatory fields with valid data
    await form.fillMandatoryFields({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd123',
      confirmPassword: 'P@ssw0rd123',
    });

    await form.submit();

    // 📸 Screenshot for visual confirmation (expected success)
    await page.screenshot({ path: 'after-submit.png', fullPage: true });

    // 🛑 Pause for manual inspection during debugging
    await page.pause();
  });

  test('TC02 - First name with special characters', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();

    //  Disable HTML5 native validation if needed
    await form.disableNativeValidation();

    //  First name includes special characters
    await form.fillMandatoryFields({
      firstName: 'Jean@',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      password: 'P@ssw0rd123',
      confirmPassword: 'P@ssw0rd123',
    });

    await form.submit();

    //  Expect no visible validation errors
    const errors = await form.getErrorMessages();
    expect(errors.length).toBe(0);

    await page.screenshot({ path: 'tc02-firstname-specialchar.png', fullPage: true });
  });

  test('TC03 - First name is empty', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();
    await form.disableNativeValidation();

    //  First name is intentionally left empty
    await form.fillMandatoryFields({
      firstName: '',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd123',
      confirmPassword: 'P@ssw0rd123',
    });

    await form.submit();

    //  Screenshot to manually verify expected error behavior
    await page.screenshot({ path: 'tc03-empty-fname-visual.png', fullPage: true });

    //  Pause for debug mode inspection
    await page.pause();
  });

  test('TC04 - Last name with special characters', async ({ page }) => {
    const form = new FormPage(page);
    await form.goto();

    //  Last name contains special characters
    await form.fillMandatoryFields({
      firstName: 'Jean',
      lastName: 'D@silva!',
      email: 'jean.dasilva@example.com',
      password: 'P@ssw0rd123',
      confirmPassword: 'P@ssw0rd123',
    });

    await form.submit();

    //  Expect no validation errors (visible or native)
    const errors = await form.getErrorMessages();
    const nativeMessage = await page.$eval('#lastName', el => (el as HTMLInputElement).validationMessage);

    expect(errors.length).toBe(0);
    expect(nativeMessage).toBe('');

    await page.screenshot({ path: 'tc04-lastname-specialchar.png', fullPage: true });
  });

  test('TC05 - Last name is empty', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();

    //  Last name intentionally left empty
    await formPage.fillMandatoryFields({
      firstName: 'John',
      lastName: '',
      email: 'john@example.com',
      password: 'Pass1234!',
      confirmPassword: 'Pass1234!',
    });

    await formPage.submit();

    //  Check for presence of visible or native validation error
    const errors = await formPage.getErrorMessages();
    const nativeMessage = await page.$eval('#lastName', el => (el as HTMLInputElement).validationMessage);

    const foundVisible = errors.length > 0;
    const foundNative = nativeMessage && nativeMessage.length > 0;

    // We expect no error for empty last name (field is optional)
    expect(foundVisible || foundNative).toBeFalsy();

    await page.screenshot({ path: 'tc05-lastname-empty.png', fullPage: true });
  });

});
