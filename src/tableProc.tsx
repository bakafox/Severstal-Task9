import type { DataRow, TableMapSortOptions } from './types'

import { createContext } from 'react'
import getTableData from './backend'

export const TableRowContext = createContext<{
    getChildren: (rowId: number) => DataRow[]
    getExpanded: (rowId: number) => boolean
    setExpanded: (rowId: number, state: boolean) => void
    hideInactive: boolean
}>({
    getChildren: _rowId => [],
    getExpanded: _rowId => true,
    setExpanded: (_rowId, _state) => {},
    hideInactive: false,
})

// Сперва у меня была идея сделать представление данных в виде Nested Tree,
// но, учитывая, какой у таблицы сценарий работы, это было бы избыточно.

// Менее затратно было бы сделать объединение данных по parentId, а затем
// получать и дополнять "карту" данных таблицы по ходу запросов пользователем.

export async function initTableData(
    sortBy: TableMapSortOptions,
    isReversed: boolean,
): Promise<[
    Map<number, DataRow[]>,
    Map<number, boolean>,
]> {
    const tableData: DataRow[] = (await getTableData()).sort(
        (a, b) => (
            (sortBy === 'id'
                ? a.id - b.id
                : (a[sortBy] as string).localeCompare(b[sortBy] as string)
            ) * (isReversed ? -1 : 1)
        ),
    )
    // Если в таблице есть значения, id которых каким-то образом МЕНЬШЕ, чем
    // их parentId, то проблемы точно не у нас, а у ответственного за БД!

    const newTableMap: Map<number, DataRow[]> = new Map()
    const newExpandMap: Map<number, boolean> = new Map()

    tableData.forEach((row) => {
        newExpandMap.set(row.id, false)

        const parent = newTableMap.get(row.parentId)

        if (parent) {
            newTableMap.get(row.parentId)?.push(row)
        }
        else {
            newTableMap.set(row.parentId, [row])
        }
    })

    return [newTableMap, newExpandMap]
}

export function getRowChildren(
    tableMap: Map<number, DataRow[]>,
    rowId: number,
): DataRow[] {
    if (!tableMap?.size) {
        throw new Error('Сперва надо получить группировку данных по parentId')
    }

    const children = tableMap.get(rowId)
    if (!children) {
        return []
    }

    return children.map(row => ({
        ...row,
        hasChildren: tableMap.has(row.id),
        children: [], // Будем получать их попозже
    }))
}

export function getRowExpanded(
    expandMap: Map<number, boolean>,
    rowId: number,
): boolean {
    return expandMap.get(rowId) ?? true // fallback никогда не произойдёт
}

export function setRowExpanded(
    expandMap: Map<number, boolean>,
    rowId: number,
    state: boolean,
): Map<number, boolean> {
    return new Map(expandMap).set(rowId, state)
}

export function setAllExpanded(
    expandMap: Map<number, boolean>,
    state: boolean,
): Map<number, boolean> {
    return new Map(Array.from(expandMap.keys()).map(rowId => [rowId, state]))
}
