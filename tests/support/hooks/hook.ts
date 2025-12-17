import { Before, After, AfterStep, Status } from '@cucumber/cucumber'
import { chromium, Browser, Page } from '@playwright/test'

let browser: Browser

Before(async function () {
    browser = await chromium.launch({ headless: false, args: ['--start-maximized'] })
    const context = await browser.newContext({
        viewport: null,
    })
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true })
    const page = await context.newPage()
    // Attach page & context to World
    this.context = context
    this.page = page
})

After(async function ({ result }) {
    // Use the result argument, not this.result, for status
    const testStatus = result?.status
    // Defensive: ensure context and tracing are available
    if (this.context && this.context.tracing) {
        if (testStatus === Status.FAILED) {
            // Ensure reports directory exists before writing trace
            const fs = await import('fs')
            const reportsDir = 'reports'
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir)
            }
            const now = new Date()
            const pad = (n: number) => n.toString().padStart(2, '0')
            const dateStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
            // Use underscores and seconds for unique filenames
            const tracePath = `${reportsDir}/trace-${dateStr}.zip`
            try {
                await this.context.tracing.stop({ path: tracePath })
            } catch (err) {
                // Optionally log error if tracing stop fails
                // console.error('Failed to save trace:', err)
            }
        } else {
            try {
                await this.context.tracing.stop()
            } catch (err) {
                // Optionally log error if tracing stop fails
            }
        }
    }
    // Always close browser if defined
    if (browser) {
        await browser.close()
    }
})


// After(async () => {
//   await browser.close();
// });


AfterStep(async function ({ result }) {
    if (result?.status === Status.FAILED) {
        /* No, this.page check is not strictly required here if you are confident that this.page will always be defined when result?.status === Status.FAILED.
        If you want to remove the redundant check, you can just remove the if (this.page) block and unindent the screenshot line.
        */
        await this.page.screenshot({ path: `reports/trace-failure-${Date.now()}.png`, fullPage: true })
    }
})


