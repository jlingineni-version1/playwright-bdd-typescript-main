import { test, expect } from '@playwright/test';

test.only('Birla Opus Login', async ({ page }) => {
  await page.goto('https://qa-contractorportal.birlaopus.com/')
  await page.getByTestId('email').fill('prachi@adityabirla.com')
  await page.getByTestId('login_button').click()
  await page.getByTestId('verify_otp_code').fill('122456')
  await page.getByTestId('verifyOtp_button').click()
  await page.waitForTimeout(5000); // waits for 3 seconds
  console.log("The content is: ",await page.locator('.toastr-message').textContent())
  await expect(page.locator('.toastr-message')).toHaveText('Invalid OTP. Please try again')
  await expect(page).toHaveTitle(/QABirlaOPUSPainterApp/)
  
});

