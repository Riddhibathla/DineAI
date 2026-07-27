import { test, expect } from '@playwright/test';

test.describe('DineAI Core Workflows', () => {
  // We mock auth by setting cookies or doing a direct login if needed, 
  // but for the sake of the hackathon E2E test, we'll test the unauthenticated guest flows.
  
  test('Guest can view the landing page and navigate to join queue', async ({ page }) => {
    // Go to guest landing page (protected by middleware for customers, but accessible if not logged in? 
    // Actually middleware redirects / to /guest, but wait... middleware says `if (pathname === "/" && role)`
    // And for `/guest`, it allows anyone? Let's check middleware.ts
    // Wait, middleware.ts doesn't protect `/guest`. So anyone can access it!
    
    await page.goto('/guest');
    
    // Check for the DineAI guest layout
    await expect(page.locator('text=Choose dinner your way')).toBeVisible();
    
    // There should be menu items rendered
    const menuItems = page.locator('.guest-dish');
    expect(await menuItems.count()).toBeGreaterThan(0);
  });

  test('Guest can join the queue', async ({ page }) => {
    await page.goto('/guest/join-queue');
    await expect(page.locator('text=Join the waitlist')).toBeVisible();

    await page.fill('input[name="name"]', 'Playwright Tester');
    await page.fill('input[name="partySize"]', '4');
    
    await page.click('button[type="submit"]');

    // Should redirect to status page
    await page.waitForURL(/\/guest\/queue-status\?id=/);
    await expect(page.locator('text=You\'re in the queue')).toBeVisible();
  });
});
