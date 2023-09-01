import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const theme = searchParams.get('theme')
  
  const url = 'https://news.google.com/news/rss/headlines/section/topic/'+theme.toUpperCase()+'/?gl=IN'
  const r = await fetch(url)
  const html = await r.text()

  const dom = parse(html)

  const items = dom.querySelectorAll('item')

  const news = []
  items.forEach(item => {
    const link = item.innerHTML.substring(item.innerHTML.indexOf('<link>') + 6, item.innerHTML.indexOf('<guid'))
    news.push({
      title: item.querySelector('title').text,
      link: link, //item.querySelector('link').text,
      date: item.querySelector('pubdate').text
    })
  })

  return NextResponse.json(news)
}
