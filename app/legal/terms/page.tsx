import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import LegalPage, { type LegalContent } from '../../../components/LegalPage'
import { defaultLocale, type Locale } from '../../../i18n/config'

import en from '../../../content/legal/terms-of-service.en.json'
import es from '../../../content/legal/terms-of-service.es.json'
import fr from '../../../content/legal/terms-of-service.fr.json'
import de from '../../../content/legal/terms-of-service.de.json'
import pt from '../../../content/legal/terms-of-service.pt.json'

const BY_LOCALE = { en, es, fr, de, pt } as unknown as Record<Locale, LegalContent>

const DESCRIPTION: Record<Locale, string> = {
  en: 'Terms of Service governing access to and use of the RAGfly platform.',
  es: 'Términos de Servicio que rigen el acceso y uso de la plataforma RAGfly.',
  fr: "Conditions d'utilisation régissant l'accès et l'usage de la plateforme RAGfly.",
  de: 'Nutzungsbedingungen für den Zugang zu und die Nutzung der RAGfly-Plattform.',
  pt: 'Termos de Serviço que regem o acesso e uso da plataforma RAGfly.',
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
    alternates: { canonical: '/legal/terms' },
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage() {
  const { content } = await resolveContent()
  return <LegalPage content={content} />
}
