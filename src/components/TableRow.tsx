import type { FC } from 'react'
import type { DataRow } from '../types'

import { MinusCircle, PlusCircle } from 'lucide-react'
import { use } from 'react'
import { TableRowContext } from '../tableProc'
import styles from './TableRow.module.css'

const TableRow: FC<{
    data: DataRow
}> = ({ data }) => {
    const context = use(TableRowContext) // = useContext

    const children = context.getChildren(data.id)
    const isExpanded = context.getExpanded(data.id)
    const isChildrenVisible = (
        children.length > 0
        && (
            context.hideInactive
                ? children.filter(child => child.isActive).length > 0
                : true
        )
    )

    return (
        <div
            className={`${styles.trow} ${!data.isActive ? 'inactive' : ''}`}
            style={{ display: (!data.isActive && context.hideInactive ? 'none' : '') }}
        >
            <div className={styles['trow-data']}>
                <span style={{ width: 32 }}>
                    {isChildrenVisible && (
                        !isExpanded
                            ? (
                                    <PlusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => context.setExpanded(data.id, true)}
                                    />
                                )
                            : (
                                    <MinusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => context.setExpanded(data.id, false)}
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
