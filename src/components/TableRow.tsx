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
    const hideInactive = useSelector(
        (state: State) => state.table.hideInactive,
    )

    const children = tableMap[data.id] ?? []
    const isExpanded = expanded[data.id] ?? false
    const isChildrenVisible = (
        children.length > 0
        && (
            hideInactive
                ? children.filter(child => child.isActive).length > 0
                : true
        )
    )

    function toggleIsOpened() {
        dispatch(toggle(data.id))
    }

    return (
        <div
            className={`${styles.trow} ${!data.isActive ? 'inactive' : ''}`}
            style={{ display: (!data.isActive && hideInactive ? 'none' : '') }}
        >
            <div className={styles['trow-data']}>
                <span style={{ width: 32 }}>
                    {isChildrenVisible && (
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
                <b style={{ flex: 3 }}>{data.id}</b>
                <p style={{ flex: 20 }}>{data.name}</p>
                <p style={{ flex: 27 }}>{data.email}</p>
                <p style={{ flex: 10 }}>{data.balance}</p>
            </div>

            {isChildrenVisible && isExpanded && (
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
