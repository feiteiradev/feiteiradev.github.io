import { test, expect } from '@playwright/test';

// The sitemap agreed for the portfolio: a two-door home, one /work page that
// holds apps, client work and three concepts, and an /apps index. Mirrors
// ROUTE_SLUGS in src/lib/routes.ts.
const SLUG = {
  work: { en: 'work', pt: 'trabalho' },
  services: { en: 'services', pt: 'servicos' },
  resume: { en: 'resume', pt: 'curriculo' },
  contact: { en: 'contact', pt: 'contacto' },
} as const;
const REMOVED = { en: ['about', 'skills', 'showcase', 'case-studies'], pt: ['sobre', 'competencias', 'trabalhos', 'casos'] };

for (const locale of ['en', 'pt'] as const) {
  test(`/${locale}/ offers the two doors and the apps as proof`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    const main = page.locator('main');
    await expect(main.locator(`a[href="/${locale}/${SLUG.resume[locale]}/"]`).first()).toBeVisible();
    await expect(main.locator(`a[href="/${locale}/${SLUG.services[locale]}/"]`).first()).toBeVisible();
    for (const app of ['crudo', 'feit-y']) {
      await expect(main.locator(`a[href="/${locale}/apps/${app}/"]`).first()).toBeVisible();
    }
  });

  test(`/${locale} work page holds apps, client work and three concepts`, async ({ page }) => {
    await page.goto(`/${locale}/${SLUG.work[locale]}/`);
    await expect(page.locator('#apps')).toBeVisible();
    await expect(page.locator('#cases')).toBeVisible();
    await expect(page.locator(`#showcase a[href^="/${locale}/${SLUG.work[locale]}/"]`)).toHaveCount(3);
  });

  test(`/${locale}/apps/ lists both apps`, async ({ page }) => {
    await page.goto(`/${locale}/apps/`);
    for (const app of ['crudo', 'feit-y']) {
      await expect(page.locator(`#apps a[href="/${locale}/apps/${app}/"]`)).toBeVisible();
    }
  });

  test(`/${locale} header links every section`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    const hrefs = await page.locator('header nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const key of ['work', 'services', 'resume', 'contact'] as const) {
      expect(hrefs).toContain(`/${locale}/${SLUG[key][locale]}/`);
    }
    expect(hrefs).toContain(`/${locale}/apps/`);
  });

  for (const slug of REMOVED[locale]) {
    test(`/${locale}/${slug}/ is no longer served`, async ({ page }) => {
      const res = await page.goto(`/${locale}/${slug}/`);
      expect(res?.ok()).toBe(false);
    });
  }
}
