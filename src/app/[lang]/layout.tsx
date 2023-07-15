import '@/globals.css'
import Navbar from '@/app/[lang]/navbar'

import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }]
}

export async function generateMetadata({
  lang
}: {
  lang: Locale
}): Promise<Metadata> {
  if (lang === 'en') return {}

  return {
    description: '소프트웨어의 높은 기준을 추구하는 컴퓨터 공학생입니다',
    openGraph: {
      description: '소프트웨어의 높은 기준을 추구하는 컴퓨터 공학생입니다',
      locale: 'ko-KR'
    }
  }
}

export default async function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const locales = await getLocales(lang)

  return (
    <>
      <Navbar lang={lang} locales={locales} />
      {children}
    </>
  )
}
