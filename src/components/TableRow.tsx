import type { FC } from 'react'
import type { Dispatch, State } from '../store'
import type { DataRow } from '../types'

import { MinusCircle, PlusCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../store/tableSlice'
import styles from './TableRow.module.css'

const TableRow: FC<{
    data: DataRow
}> = ({ data }) => {
    const dispatch: Dispatch = useDispatch()
    const tableMap = useSelector(
        (state: State) => state.table.tableMap,
    )
    const expanded = useSelector(
        (state: State) => state.table.expanded,
    )

    const children = tableMap[data.id] ?? []
    const isExpanded = expanded[data.id] ?? false

    function toggleIsOpened() {
        dispatch(toggle(data.id))
    }

    return (
        <div className={`${styles.trow} ${!data.isActive ? 'inactive' : ''}`}>
            <div className={styles['trow-data']}>
                <span style={{ width: 40 }}>
                    {(children.length > 0) && (
                        !isExpanded
                            ? (
                                    <PlusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => toggleIsOpened()}
                                    />
                                )
                            : (
                                    <MinusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => toggleIsOpened()}
                                    />
                                )
                    )}

                </span>
                <b style={{ flex: 2 }}>{data.id}</b>
                <p style={{ flex: 20 }}>{data.name}</p>
                <p style={{ flex: 28 }}>{data.email}</p>
                <p style={{ flex: 10 }}>{data.balance}</p>
            </div>

            {children.length > 0 && isExpanded && (
                <div className={styles['trow-children']}>
                    {children.map((child: DataRow) => (
                        <TableRow key={child.id} data={child} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TableRow
