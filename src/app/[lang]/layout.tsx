import '@/globals.css'
import Navbar from '@/app/[lang]/navbar'

import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }]
}

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  if (lang === 'en') {
    return {
      title: {
        default: 'Seungwon An (Harry)',
        template: '%s | Seungwon An (Harry)'
      },
      description:
        "I'm a sophomore computer science major student at SUNY Korea who pursues high standards in software. I am currently interested in Software Architecture."
    }
  }

  return {
    title: {
      default: '안승원',
      template: '%s | 안승원'
    },
    description:
      '저는 SUNY Korea에서 소프트웨어의 높은 기준을 추구하기 위해 컴퓨터 과학과를 전공 중인 2학년 학생입니다. 현재 소프트웨어 아키텍처에 관심이 있습니다.',
    openGraph: {
      description:
        '저는 SUNY Korea에서 소프트웨어의 높은 기준을 추구하기 위해 컴퓨터 과학과를 전공 중인 2학년 학생입니다. 현재 소프트웨어 아키텍처에 관심이 있습니다.',
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
