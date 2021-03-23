import useSwr from 'swr'
import { useRouter } from 'next/router'
import { useTrail, animated as a } from 'react-spring'
import styles from '../styles/Home.module.css'

import themes from './themes'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/in'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('in')
dayjs.extend(relativeTime)

import ReactGA from 'react-ga'

ReactGA.initialize('UA-26518-5')

const fetcher = url => fetch(url).then(res => res.json())

export default function Main() {
    const router = useRouter()
    const t = themes.find(t => t.link === '/' + router.query.theme) || themes[0]
    const { data, error } = useSwr(
        router.query.theme ? '/api/' + router.query.theme : null, 
        fetcher,
        { revalidateOnFocus: false }
    )

    const trail = useTrail(8, {
        from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' }
    })
    //console.log('render')
    
    if (error) return <div className={styles.footer}>Ошибка</div>
    
    if (!data) return <div className={styles.footer}>Загрузка...</div>

    const items = data.map(item => (
        {
            title: item.title.substr(0, item.title.lastIndexOf(' - ')),
            publisher: item.title.substr(item.title.lastIndexOf(' - ') + 3),
            link: item.link,
            time: dayjs(item.date).fromNow()
        }
    ))
    ReactGA.pageview(router.query.theme)
        
    return (
        <>
            {trail.map((props, i) => (
                    <a.div key={i} style={props}>
                        <Item item={items[i]} color={t.color} />
                    </a.div>
                )
            )}
            {items.slice(8).map((item, i) => <Item item={item} color={t.color} key={10+i} />)}
        </>
    )
}
