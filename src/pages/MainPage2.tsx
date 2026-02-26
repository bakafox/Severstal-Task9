import type { FC } from 'react'
import type { DataRow, TableMapSortOptions } from '../types'

import { CopyMinus, CopyPlus, Eye, EyeOff } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AsideButton from '../components/AsideButton'
import TableHead from '../components/TableHead'
import TableRow from '../components/TableRow'
import { getRowChildren, getRowExpanded, initTableData, setAllExpanded, setRowExpanded, TableRowContext } from '../tableProc'
import styles from './MainPage.module.css'

const MainPage2: FC = () => {
    const [tableMap, setTableMap] = useState<Map<number, DataRow[]>>(() => new Map())
    const [tableMap2, setTableMap2] = useState<Map<number, DataRow[]>>(() => new Map())
    const [expandMap, setExpandMap] = useState<Map<number, boolean>>(() => new Map())
    const [expandMap2, setExpandMap2] = useState<Map<number, boolean>>(() => new Map())
    const [hideInactive, setHideInactive] = useState<boolean>(false)

    const rows = tableMap.get(0) ?? [] // "Глобальный" parent имеет parentId=0
    const rows2 = tableMap2.get(0) ?? [] // "Глобальный" parent имеет parentId=0

    async function updateTableData(opt: TableMapSortOptions, rev: boolean): Promise<void> {
        const [newTableMap, newExpandMap] = await initTableData(opt, rev)
        setTableMap(newTableMap)
        setExpandMap(newExpandMap)
        console.log('updateTableData')
    }
    async function updateTableData2(opt: TableMapSortOptions, rev: boolean): Promise<void> {
        const [newTableMap, newExpandMap] = await initTableData(opt, rev)
        setTableMap2(newTableMap)
        setExpandMap2(newExpandMap)
        console.log('updateTableData2')
    }

    const tableRowContextData = useMemo(() => (
        {
            getChildren(rowId: number) {
                return getRowChildren(tableMap, rowId)
            },
            getExpanded(rowId: number) {
                return getRowExpanded(expandMap, rowId)
            },
            setExpanded(rowId: number, state: boolean) {
                setExpandMap(setRowExpanded(expandMap, rowId, state))
            },
            hideInactive,
        }
    ), [tableMap, expandMap, hideInactive])
    const tableRowContextData2 = useMemo(() => (
        {
            getChildren(rowId: number) {
                return getRowChildren(tableMap2, rowId)
            },
            getExpanded(rowId: number) {
                return getRowExpanded(expandMap2, rowId)
            },
            setExpanded(rowId: number, state: boolean) {
                setExpandMap2(setRowExpanded(expandMap2, rowId, state))
            },
            hideInactive,
        }
    ), [tableMap2, expandMap2, hideInactive])

    useEffect(() => {
        updateTableData('id', false)
        updateTableData2('id', false)
    }, [])

    return (
        <div className={styles['page-wrap']}>
            <header>
                <h2>
                    Демонстрация независимой работы нескольких таблиц,
                    <br />
                    или в чём была главная проблема использования RTK
                </h2>
            </header>

            {(rows.length > 0)
                ? (
                        <div className={styles['table-wrap']}>
                            <main>
                                <TableHead
                                    onSortUpdated={(opt, rev) => updateTableData(opt, rev)}
                                />

                                <TableRowContext
                                    value={tableRowContextData}
                                >
                                    {rows.map(row => (
                                        <TableRow key={row.id} data={row} />
                                    ))}
                                </TableRowContext>
                            </main>

                            <main>
                                <TableHead
                                    onSortUpdated={(opt, rev) => updateTableData2(opt, rev)}
                                />

                                <TableRowContext
                                    value={tableRowContextData2}
                                >
                                    {rows2.map(row => (
                                        <TableRow key={row.id} data={row} />
                                    ))}
                                </TableRowContext>
                            </main>

                            <aside>
                                <AsideButton
                                    onClick={() => setHideInactive(!hideInactive)}
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
                                    onClick={() => setExpandMap(setAllExpanded(expandMap, true))}
                                >
                                    <CopyPlus style={{ flexShrink: 0 }} />
                                    Развернуть всё
                                </AsideButton>

                                <AsideButton
                                    onClick={() => setExpandMap(setAllExpanded(expandMap, false))}
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

export default MainPage2
