import { test, expect } from '@playwright/test'

test('Birla Opus Login', async ({ page }) => {
    await page.goto('https://qa-contractorportal.birlaopus.com/')
    await page.getByTestId('email').fill('prachi@adityabirla.com')
    // await page.getByTestId('password').fill('your-password')
    // await page.getByTestId('login-button').click()
})
