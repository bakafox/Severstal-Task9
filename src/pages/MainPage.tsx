import type { FC } from 'react'
import type { Dispatch, State } from '../store'

import { CopyMinus, CopyPlus, Eye, EyeOff } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsideButton from '../components/AsideButton'
import TableHead from '../components/TableHead'
import TableRow from '../components/TableRow'
import { createTableMap, toggleAll, toggleInactive } from '../store/tableSlice'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
    const dispatch: Dispatch = useDispatch()
    const tableMap = useSelector(
        (state: State) => state.table.tableMap,
    )
    const hideInactive = useSelector(
        (state: State) => state.table.hideInactive,
    )

    const rows = tableMap[0] ?? []

    useEffect(() => {
        dispatch(createTableMap('id', false))
    }, [])

    return (
        <div className={styles['page-wrap']}>
            <header>
                <h1>
                    Сведения о
                    <em> клиентах</em>
                </h1>
            </header>

            {(rows.length > 0)
                ? (
                        <div className={styles['table-wrap']}>
                            <main>
                                <TableHead />

                                {rows.map(row => (
                                    <TableRow key={row.id} data={row} />
                                ))}
                            </main>

                            <aside>
                                <AsideButton
                                    onClick={() => dispatch(toggleInactive())}
                                    isActive={!hideInactive}
                                >
                                    {!hideInactive
                                        ? (
                                                <>
                                                    <Eye style={{ flexShrink: 0 }} />
                                                    Отображать неактивных клиентов
                                                </>
                                            )
                                        : (
                                                <>
                                                    <EyeOff style={{ flexShrink: 0 }} />
                                                    Скрывать неактивных клиентов
                                                </>
                                            )}
                                </AsideButton>

                                <AsideButton
                                    onClick={() => dispatch(toggleAll(true))}
                                >
                                    <CopyPlus style={{ flexShrink: 0 }} />
                                    Развернуть всё
                                </AsideButton>

                                <AsideButton
                                    onClick={() => dispatch(toggleAll(false))}
                                >
                                    <CopyMinus style={{ flexShrink: 0 }} />
                                    Свернуть всё
                                </AsideButton>
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
