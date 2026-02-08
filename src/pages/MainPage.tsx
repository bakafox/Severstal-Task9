import type { FC } from 'react'
import type { DataRow, NestedRow } from '../types'

import { useEffect, useState } from 'react'
import getDataGroupByParentId from '../process'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
    const [dataGroup, setDataGroup] = useState<Map<number, DataRow[]>>()
    const [nestedData, setNestedData] = useState<NestedRow[]>([])

    function getDataRowChildren(parentId: number): NestedRow[] {
        if (!dataGroup) {
            throw new Error('Сперва надо получить группировку данных по parentId')
        }

        const children = dataGroup.get(parentId)

        if (!children) {
            return []
        }

        return children.map(row => ({
            ...row,
            hasChildren: dataGroup.has(row.id) ?? false,
            children: [], // Будем получать их попозже
        }))
    }

    useEffect(() => {
        async function fetchDataGroup() {
            setDataGroup(await getDataGroupByParentId())
            // console.log(await getDataGroupByParentId())
        }

        fetchDataGroup()
    }, [])

    useEffect(() => {
        if (dataGroup) {
            // Инициализируем самый первый "слой" данных
            setNestedData(getDataRowChildren(0))
        }
    }, [dataGroup])

    return (
        <div className={styles['page-wrap']}>
            <header>
                <h1>Сведения о клиентах</h1>
            </header>

            {(nestedData.length > 0)
                ? (
                        <div className={styles['table-wrap']}>
                            <main className={styles.table}>
                                {nestedData.map(row => (
                                    <p>{row.balance}</p>
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
