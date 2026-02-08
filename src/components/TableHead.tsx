import type { FC } from 'react'
import type { Dispatch } from '../store'
import type { TableMapSortOptions } from '../types'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTableMap } from '../store/tableSlice'
import styles from './TableHead.module.css'

type HeaderSortOption = [TableMapSortOptions, string, number]

const TableHead: FC = () => {
    const dispatch: Dispatch = useDispatch()

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

        dispatch(
            createTableMap(newSortOption, sortOption === newSortOption ? !sortReverse : false),
        )
    }

    const headerOptions: HeaderSortOption[] = [
        ['id', 'ID', 3],
        ['name', 'Полное имя', 20],
        ['email', 'Электроннная почта', 27],
        ['balance', 'Баланс', 10],
    ]

    return (
        <div className={styles.thead}>
            {
                headerOptions.map(option => (
                    <button
                        key={option[0]}
                        className={sortOption === option[0] ? 'selected' : ''}
                        style={{ flex: option[2] }}
                        onClick={() => updateSortParams(option[0])}
                    >
                        {(sortOption !== option[0] || option[2] > 5) && option[1]}
                        {sortOption === option[0] && (sortReverse
                            ? (<ChevronUp />)
                            : (<ChevronDown />))}
                    </button>
                ))
            }
        </div>
    )
}

export default TableHead
