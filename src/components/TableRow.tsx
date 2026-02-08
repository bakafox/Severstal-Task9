import type { FC } from 'react'
import type { NestedRow } from '../types'

import { MinusCircle, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getRowChildren } from '../tableMap'
import styles from './TableRow.module.css'

const TableRow: FC<{
    data: NestedRow
}> = ({ data }) => {
    const [children, setChildren] = useState<NestedRow[]>([])
    const [isOpened, setIsOpened] = useState<boolean>(false)

    useEffect(() => {
        if (data.hasChildren) {
            setChildren(getRowChildren(data.id))
        }
    }, [])

    return (
        <div className={`${styles.trow} ${!data.isActive ? 'inactive' : ''}`}>
            <div className={styles['trow-data']}>
                <span style={{ width: 40 }}>
                    {data.hasChildren && (
                        !isOpened
                            ? (
                                    <PlusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => setIsOpened(true)}
                                    />
                                )
                            : (
                                    <MinusCircle
                                        style={{ cursor: 'pointer', marginBottom: -3 }}
                                        onClick={() => setIsOpened(false)}
                                    />
                                )
                    )}

                </span>
                <b style={{ flex: 2 }}>{data.id}</b>
                <p style={{ flex: 20 }}>{data.name}</p>
                <p style={{ flex: 28 }}>{data.email}</p>
                <p style={{ flex: 10 }}>{data.balance}</p>
            </div>

            {data.hasChildren && children.length > 0 && isOpened && (
                <div className={styles['trow-children']}>
                    {children.map((child: NestedRow) => (
                        <TableRow key={child.id} data={child} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TableRow
