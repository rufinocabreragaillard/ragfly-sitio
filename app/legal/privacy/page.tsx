import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import LegalPage, { type LegalContent } from '../../../components/LegalPage'
import { defaultLocale, type Locale } from '../../../i18n/config'

import en from '../../../content/legal/privacy-policy.en.json'
import es from '../../../content/legal/privacy-policy.es.json'
import fr from '../../../content/legal/privacy-policy.fr.json'
import de from '../../../content/legal/privacy-policy.de.json'
import pt from '../../../content/legal/privacy-policy.pt.json'

const BY_LOCALE = { en, es, fr, de, pt } as unknown as Record<Locale, LegalContent>

const DESCRIPTION: Record<Locale, string> = {
  en: 'How RAGfly collects, uses, discloses, and protects personal information.',
  es: 'Cómo RAGfly recopila, usa, divulga y protege la información personal.',
  fr: 'Comment RAGfly collecte, utilise, divulgue et protège les informations personnelles.',
  de: 'Wie RAGfly personenbezogene Daten erhebt, nutzt, offenlegt und schützt.',
  pt: 'Como a RAGfly coleta, usa, divulga e protege informações pessoais.',
}

async function resolveContent(): Promise<{ content: LegalContent; locale: Locale }> {
  const locale = (await getLocale()) as Locale
  const content = BY_LOCALE[locale] ?? BY_LOCALE[defaultLocale]
  return { content, locale }
}

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale } = await resolveContent()
  return {
    title: `${content.title} — RAGfly`,
    description: DESCRIPTION[locale] ?? DESCRIPTION[defaultLocale],
    alternates: { canonical: '/legal/privacy' },
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage() {
  const { content } = await resolveContent()
  return <LegalPage content={content} />
}
