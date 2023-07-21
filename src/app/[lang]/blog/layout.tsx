import type { Locale } from '@/i18n-config'
import Navbar from './navbar'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  if (lang === 'en')
    return {
      title: 'Blog',
      description:
        'Read blog posts about both dev-related and my personal stories.',
      openGraph: {
        description:
          'Read blog posts about both dev-related and my personal stories.'
      }
    }

  return {
    title: '블로그',
    description:
      '저의 개인적인 경험과 개발 경험에 관련된 블로그 포스팅을 읽어보세요!',
    openGraph: {
      description:
        '저의 개인적인 경험과 개발 경험에 관련된 블로그 포스팅을 읽어보세요!',
      locale: 'ko-KR'
    }
  }
}

export default function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <Navbar lang={lang} />
      {children}
    </>
  )
}
