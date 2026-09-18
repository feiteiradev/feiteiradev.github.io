'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@i18n/config';
import { APP_DOC_SLUGS, appDocFromSlug, routeKeyFromSlug, routeSlug } from '../../../../lib/routes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Strip the current locale prefix.
    let rest = pathname;
    for (const loc of locales) {
      if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
        rest = pathname.slice(`/${loc}`.length);
        break;
      }
    }

    // Translate the page slug too, not just the prefix. Slugs are localised,
    // so swapping only the prefix on /pt/servicos/ would send the visitor to
    // /en/servicos/, which does not exist.
    const [, first = '', ...tail] = rest.split('/');
    const key = first ? routeKeyFromSlug(first, locale) : null;
    const translated = key ? routeSlug(key, newLocale) : first;
    // App documents are localised under /apps/<app>/ too: suporte <-> support.
    const doc = first === 'apps' && tail[1] ? appDocFromSlug(tail[1], locale) : null;
    const rest2 = doc ? [tail[0], APP_DOC_SLUGS[doc][newLocale], ...tail.slice(2)] : tail;
    const suffix = [translated, ...rest2].filter(Boolean).join('/');

    router.push(`/${newLocale}${suffix ? `/${suffix}` : ''}/`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 p-2 text-[15px] uppercase transition-colors hover:text-primary"
        aria-label={t('label')}
      >
        {locale}
        <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            aria-current={loc === locale ? 'true' : undefined}
            className="cursor-pointer aria-[current=true]:text-primary"
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
