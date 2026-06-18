export const locales = ['es', 'en', 'pt', 'fr', 'de'] as const
export type Locale = (typeof locales)[number]
// Mercado objetivo: global / inglés. El inglés es el fallback final;
// el idioma del navegador del visitante igual se detecta en request.ts (accept-language).
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
}

export const localeShort: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
  fr: 'FR',
  de: 'DE',
}
