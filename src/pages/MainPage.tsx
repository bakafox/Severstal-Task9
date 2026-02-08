import type { FC } from 'react'
import type { DataRow, NestedRow } from '../types'

import { useEffect, useState } from 'react'
import TableRow from '../components/TableRow'
import { getRowChildren, initTableMap } from '../tableMap'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
    const [nestedData, setNestedData] = useState<NestedRow[]>([])

    useEffect(() => {
        async function initNestedData() {
            await initTableMap()
            setNestedData(getRowChildren(0))
        }

        initNestedData()
    }, [])

    return (
        <div className={styles['page-wrap']}>
            <header>
                <h1>Сведения о клиентах</h1>
            </header>

            {(nestedData.length > 0)
                ? (
                        <div className={styles['table-wrap']}>
                            <main>
                                {/* <TableHead /> */}

                                {nestedData.map(row => (
                                    <TableRow key={row.id} data={row} />
                                ))}
                            </main>

                            <aside>
                                {/* <TiledButton />
                            <TiledButton />
                            <TiledButton /> */}
                            </aside>
                        </div>
                    )
                : (
                        <p>Загрузка!</p>
                    )}
        </div>
    )
}

export default MainPage
