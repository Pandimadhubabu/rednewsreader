import Single from '../../../components/Single'
import styles from '../../../styles/Single.module.css'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

async function fetchData(theme) {
  const res = await fetch(`https://newslinks.vercel.app//api/get?theme=${theme}`, { next: { revalidate: 60 } })
  const data = await res.json()
  return data
}

export default async function Page({ params }) {
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
    <div className={styles.container}>
      {/* <motion.div
        initial={{ opacity: 0, y: '65vh' }}
        animate={{ opacity: [0, 1, 1, 0], y: ['65vh', '0vh', '0vh', '-65vh']}}
        transition={{ delay: 0.5, duration: 4, ease: 'easeInOut', times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
      > */}
        <Single items={items} />
      {/* </motion.div> */}
    </div>
  )
}
