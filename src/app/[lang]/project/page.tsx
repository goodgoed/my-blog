import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  if (lang === 'en')
    return {
      title: 'Project',
      description: 'This is where I fully enjoy what I love to do.',
      openGraph: {
        description: 'This is where I fully enjoy what I love to do.'
      }
    }

  return {
    title: '프로젝트',
    description: '제가 즐겨 개발한 프로젝트를 구경해보세요!',
    openGraph: {
      description: '제가 즐겨 개발한 프로젝트를 구경해보세요!',
      locale: 'ko-KR'
    }
  }
}

export default async function Project({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const locales = await getLocales(lang)

  return (
    <section className="flex flex-auto justify-center items-center">
      <h1 className="text-center text-2xl font-bold">
        {locales['project'].temp}
      </h1>
    </section>
  )
}
