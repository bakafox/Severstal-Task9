import type { DataRow, NestedRow } from './types'

import { getTableData } from './backend'

// Сперва у меня была идея сделать представление данных в виде Nested Tree,
// но, учитывая, какой у таблицы сценарий работы, это было бы избыточно.

// Менее затратно было бы сделать объединение данных по parentId, а затем
// получать и дополнять "карту" данных таблицы по ходу запросов пользователем.

const tableMap: Map<number, DataRow[]> = new Map()

export async function initTableMap(): Promise<void> {
    const tableData: DataRow[] = (
        await getTableData()
    ).sort((a, b) => a.id > b.id ? 1 : -1)

    // Если в таблице есть значения, id которых каким-то образом МЕНЬШЕ, чем
    // их parentId, то проблемы точно не у нас, а у ответственного за БД!

    tableMap.clear()

    tableData.forEach((row) => {
        const parent = tableMap.get(row.parentId)

        if (parent) {
            tableMap.get(row.parentId)?.push(row)
        }
        else {
            tableMap.set(row.parentId, [row])
        }
    })
}

export function getRowChildren(parentId: number): NestedRow[] {
    if (!tableMap?.size) {
        throw new Error('Сперва надо получить группировку данных по parentId')
    }

    const children = tableMap.get(parentId)
    if (!children) {
        return []
    }

    return children.map(row => ({
        ...row,
        hasChildren: tableMap.has(row.id) ?? false,
        children: [], // Будем получать их попозже
    }))
}
