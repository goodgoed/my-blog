import { allPosts, Post } from 'contentlayer/generated'

import { Locale } from '@/i18n-config'
import PostCard from '@/components/post'
import { compareDesc } from 'date-fns'
import RSS from 'rss'
import path from 'path'
import fs from 'fs'

async function generateRss(lang: Locale) {
  let options = {
    title: 'Seungwon An (Harry)',
    description: '',
    feed_url: `http://localhost:3000/rss_${lang}.xml`,
    site_url: 'http://localhost:3000',
    language: lang,
    pubDate: new Date()
  }
  switch (lang) {
    case 'en':
      options.description =
        'A computer science student who pursues high standards in software'
      break
    case 'ko':
      options.description =
        '소프트웨어의 높은 기준을 추구하는 컴퓨터 공학생입니다'
      break
  }
  const feed = new RSS(options)

  allPosts.forEach((post) => {
    if (post.locale === lang) {
      feed.item({
        title: post.title,
        description: post.summary,
        url: `http://localhost:3000/${post.locale}/blog/${post.slug}`,
        date: post.date,
        author: 'Seungwon An (Harry)',
        categories: [post.category]
      })
    }
  })

  const fullFilePath = path.join(process.cwd(), 'public', `rss_${lang}.xml`)

  if (fs.existsSync(fullFilePath)) {
    await fs.promises.unlink(fullFilePath)
  }

  fs.writeFile(fullFilePath, feed.xml({ indent: true }), (err) => {
    if (err) {
      console.error('Error: ', err)
    }

    console.log('RSS feed successfully generated!')
  })
}

function getAllPosts(lang: String) {
  const posts = allPosts
    .filter((post) => post.locale === lang)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return posts
}

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  await generateRss(lang)
  const posts: Post[] = getAllPosts(lang)

  return (
    <ul className="flex flex-col gap-6 px-2">
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} />
      })}
    </ul>
  )
}
