import NewsList from '../../components/NewsList'
import themes from '../../components/themes'
import styles from '../../styles/Home.module.css'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

async function fetchData(theme) {
    const res = await fetch(`https://newslinks.vercel.app/api/get?theme=${theme}`, { next: { revalidate: 60 } })
    const data = await res.json()
    return data
}

export default async function Page({ params }) {
    const t = themes.find(t => t.link === params.theme) || themes[0]
    
    const data = await fetchData(params.theme)
    let items = []
    if (data) {
        items = data.map(item => (
            {
                title: item.title.substr(0, item.title.lastIndexOf(' - ')),
                publisher: item.title.substr(item.title.lastIndexOf(' - ') + 3),
                link: item.link,
                time: dayjs(item.date).fromNow()
            }
        ))
    }

    return (
        <>
            <NewsList items={items} color={t.color} />

            <footer className={styles.footer}>
                Powered by Google News
            </footer>
        </>
    )
}
