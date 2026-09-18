import { test, expect } from '@playwright/test';

// These are the URLs typed into App Store Connect. App Review opens them in a
// cold browser, so each one must resolve and the support pages must offer a
// way to reach a person. Mirrors APPS and APP_DOC_SLUGS in src/lib/routes.ts.
const APPS = ['crudo', 'feit-y'] as const;
const DOC_SLUGS = {
  support: { en: 'support', pt: 'suporte' },
  privacy: { en: 'privacy', pt: 'privacidade' },
} as const;
const CONTACT_SLUG = { en: 'contact', pt: 'contacto' } as const;
const LOCALES = ['en', 'pt'] as const;

for (const locale of LOCALES) {
  for (const app of APPS) {
    test(`/${locale}/apps/${app}/ landing links to its support and privacy pages`, async ({ page }) => {
      await page.goto(`/${locale}/apps/${app}/`);
      await expect(page.locator('h1')).toBeVisible();
      for (const doc of ['support', 'privacy'] as const) {
        await expect(
          page.locator(`main a[href="/${locale}/apps/${app}/${DOC_SLUGS[doc][locale]}/"]`),
        ).toBeVisible();
      }
    });

    test(`/${locale}/apps/${app} privacy page resolves`, async ({ page }) => {
      const res = await page.goto(`/${locale}/apps/${app}/${DOC_SLUGS.privacy[locale]}/`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('main h2').first()).toBeVisible();
    });

    test(`/${locale}/apps/${app} support page opens the form with ${app} selected`, async ({ page }) => {
      const res = await page.goto(`/${locale}/apps/${app}/${DOC_SLUGS.support[locale]}/`);
      expect(res?.status()).toBe(200);
      await expect(page.locator('main a[href^="mailto:"]')).toBeVisible();

      await page.locator(`main a[href="/${locale}/${CONTACT_SLUG[locale]}/?topic=${app}"]`).click();
      await expect(page.locator('select[name="topic"]')).toHaveValue(app);
    });
  }

  test(`the old /${locale} support page is gone`, async ({ page }) => {
    const res = await page.goto(`/${locale}/${locale === 'en' ? 'support' : 'suporte'}/`);
    // Not 404 specifically: under output: "export" the dev server answers an
    // unlisted path with 500, while GitHub Pages serves 404.html.
    expect(res?.ok()).toBe(false);
  });
}

// App documents are localised too, so switching language on one has to
// translate the document slug: /pt/apps/crudo/suporte/ -> /en/apps/crudo/support/.
test('language switcher translates an app document slug', async ({ page }) => {
  await page.goto('/pt/apps/crudo/suporte/');
  await page.waitForLoadState('networkidle');
  if (page.viewportSize()!.width < 1024) {
    await page.locator('button[aria-controls="mobile-navigation"]').click();
  }
  await page.locator('button[aria-label="Mudar idioma"]:visible').first().click();
  await page.getByRole('menuitem', { name: /English/i }).click();
  await expect(page).toHaveURL(/\/en\/apps\/crudo\/support\/?$/);
});
