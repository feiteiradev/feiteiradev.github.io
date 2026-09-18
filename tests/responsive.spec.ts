import { test, expect, type Page } from '@playwright/test';

const ROUTES = [
  { path: '/en/', name: 'home-en' },
  { path: '/pt/', name: 'home-pt' },
  { path: '/en/showcase', name: 'showcase-listing' },
  { path: '/en/showcase/sereno-spa', name: 'showcase-sereno-spa' },
  { path: '/en/showcase/vertex-studio', name: 'showcase-vertex-studio' },
  { path: '/en/showcase/roam-bean', name: 'showcase-roam-bean' },
];

const MOBILE_NAV_PROJECTS = new Set(['mobile-small', 'mobile-large', 'tablet', 'desktop-half']);

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  expect(hasHorizontalOverflow, 'page should not have horizontal overflow').toBe(false);
}

for (const route of ROUTES) {
  test.describe(`${route.name}`, () => {
    test('has no horizontal overflow', async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      await expectNoHorizontalOverflow(page);
    });
  });
}

test.describe('Header responsiveness', () => {
  test('switches between burger and desktop navigation at the expected breakpoint', async ({ page }, testInfo) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');

    const burgerButton = page.locator('button[aria-controls="mobile-navigation"]');
    const desktopNav = page.locator('header#home nav[aria-label="Main navigation"]');
    const shouldUseMobileNav = MOBILE_NAV_PROJECTS.has(testInfo.project.name);

    if (shouldUseMobileNav) {
      await expect(burgerButton).toBeVisible();
      await expect(desktopNav).not.toBeVisible();

      await burgerButton.click();
      await expect(page.locator('#mobile-navigation')).toBeVisible();
    } else {
      await expect(burgerButton).not.toBeVisible();
      await expect(desktopNav).toBeVisible();
    }
  });

  test('keeps a single visible home link on the showcase listing page', async ({ page }) => {
    await page.goto('/en/showcase');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('a[aria-label="Pedro Feiteira — home"]:visible')).toHaveCount(1);
    // The floating back button belongs to detail pages only, never the listing.
    await expect(page.getByRole('link', { name: 'Go Back' })).toHaveCount(0);
  });
});

test.describe('Showcase detail navigation', () => {
  test('shows one floating back button below the sticky navbar', async ({ page }) => {
    await page.goto('/en/showcase/roam-bean');
    await page.waitForLoadState('networkidle');

    const backButton = page.getByRole('link', { name: 'Go Back' });

    await expect(backButton).toBeVisible();
    await expect(backButton).toHaveCount(1);
    await expect(backButton).toHaveAttribute('href', '/en/showcase/');

    const backButtonBox = await backButton.boundingBox();
    expect(backButtonBox).not.toBeNull();
    expect(backButtonBox!.y, 'back button should sit below the sticky showcase navbar').toBeGreaterThanOrEqual(72);
  });

  test('shows mobile quick links on showcase demos for small viewports', async ({ page }, testInfo) => {
    test.skip(!MOBILE_NAV_PROJECTS.has(testInfo.project.name), 'Mobile quick links are only rendered below the desktop breakpoint.');

    await page.goto('/en/showcase/roam-bean');
    await page.waitForLoadState('networkidle');

    const mobileShowcaseNav = page.getByRole('navigation', { name: 'Mobile showcase navigation' });

    await expect(mobileShowcaseNav).toBeVisible();
    await expect(page.getByRole('link', { name: 'Current Releases' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Taste Atlas' })).toBeVisible();

    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));

    await expect(mobileShowcaseNav).toBeVisible();

    const navBox = await mobileShowcaseNav.boundingBox();
    expect(navBox).not.toBeNull();
    expect(navBox!.y, 'mobile showcase shortcuts should remain pinned near the top after scrolling').toBeLessThan(140);
  });
});

test.describe('Services page navigation', () => {
  test('routes to the contact page when a service card is clicked on the standalone services page', async ({ page }) => {
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');

    await page.locator('#services button').first().click();

    await expect(page).toHaveURL(/\/en\/contact\/?$/);
    await expect(page.locator('#contact')).toBeVisible();
  });
});

test.describe('Home page core sections', () => {
  test('renders header, hero, contact, and footer', async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('header#home')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Localised routes', () => {
  // Slugs differ per locale (/pt/servicos/ vs /en/services/), so switching
  // language has to translate the slug, not just swap the /pt/ prefix. Getting
  // that wrong lands the visitor on /en/servicos/, which is not built.
  test('language switcher translates the slug, not just the prefix', async ({ page }, testInfo) => {
    // The switch remounts the [locale] layout on the client, which is where
    // next-themes' inline script used to trip React's script-tag error.
    const scriptErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('Encountered a script tag')) scriptErrors.push(msg.text());
    });

    await page.goto('/pt/servicos/');
    await page.waitForLoadState('networkidle');

    // Below the lg breakpoint the switcher only exists inside the burger menu.
    if (MOBILE_NAV_PROJECTS.has(testInfo.project.name)) {
      await page.locator('button[aria-controls="mobile-navigation"]').click();
      await expect(page.locator('#mobile-navigation')).toBeVisible();
    }

    await page.getByRole('button', { name: 'Mudar idioma' }).first().click();
    await page.getByRole('menuitem', { name: /English/i }).click();

    await expect(page).toHaveURL(/\/en\/services\/?$/);
    await expect(page.locator('#services')).toBeVisible();
    expect(scriptErrors).toEqual([]);
  });

  test('a slug from the wrong locale is not served', async ({ page }) => {
    const response = await page.goto('/en/servicos/');
    expect(response?.status(), '/en/servicos/ must not exist').toBe(404);
  });
});
