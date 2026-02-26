import type { FC } from 'react'
import type { TableMapSortOptions } from '../types'

import { useState } from 'react'
import SortButton from './SortButton'
import styles from './TableHead.module.css'

const TableHead: FC<{
    onSortUpdated: (opt: TableMapSortOptions, rev: boolean) => void
}> = ({ onSortUpdated }) => {
    const [sortOption, setSortOption] = useState<TableMapSortOptions>('id')
    const [sortReverse, setSortReverse] = useState<boolean>(false)

    function updateSortParams(newSortOption: TableMapSortOptions) {
        if (sortOption === newSortOption) {
            setSortReverse(!sortReverse)
        }
        else {
            setSortOption(newSortOption)
            setSortReverse(false)
        }

        onSortUpdated(newSortOption, sortOption === newSortOption ? !sortReverse : false)
    }

    const headerOptions: [TableMapSortOptions, string, number][] = [
        ['id', 'ID', 3],
        ['name', 'Полное имя', 20],
        ['email', 'Электроннная почта', 27],
        ['balance', 'Баланс', 10],
    ]

    return (
        <div className={styles.thead}>
            {
                headerOptions.map(option => (
                    <SortButton
                        key={option[0]}
                        label={option[1]}
                        flex={option[2]}
                        isSelected={sortOption === option[0]}
                        isReversed={sortReverse}
                        onClick={() => updateSortParams(option[0])}
                    />
                ))
            }
        </div>
    )
}

export default TableHead
