import { test, expect } from '@playwright/test';

const LOCALES = ['en', 'pt'] as const;

// URLs are localised: the same page is /en/showcase/ and /pt/trabalhos/.
// Mirrors ROUTE_SLUGS in src/lib/routes.ts.
const SHOWCASE_SLUG = { en: 'work', pt: 'trabalho' } as const;
const BACK_LABEL = { en: 'Go Back', pt: 'Voltar' } as const;
const SLUGS = ['meridian-goods', 'linha-viva-listings', 'sereno-spa'];

for (const locale of LOCALES) {
  test.describe(`Showcases in ${locale}`, () => {
    // The hub is its own route, not a homepage section: a766be7 ("add
    // showcase, services, skills, about, contact pages") moved it and this
    // assertion was never updated, so it failed against / for months.
    test('Hub displays properly', async ({ page }) => {
      await page.goto(`/${locale}/${SHOWCASE_SLUG[locale]}`);
      const showcaseSection = page.locator('#showcase');
      await expect(showcaseSection).toBeVisible();
    });

    for (const slug of SLUGS) {
      test(`Showcase page /${locale}/${SHOWCASE_SLUG[locale]}/${slug} loads`, async ({ page }) => {
        await page.goto(`/${locale}/${SHOWCASE_SLUG[locale]}/${slug}`);
        const backButton = page.getByRole('link', { name: BACK_LABEL[locale] });
        await expect(backButton).toBeVisible();
        await expect(backButton).toHaveAttribute('href', `/${locale}/${SHOWCASE_SLUG[locale]}/`);
      });
    }
  });
}