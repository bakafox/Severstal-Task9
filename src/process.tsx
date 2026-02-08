import type { DataRow } from './types'

import { getTableData } from './backend'

// Сперва у меня была идея сделать представление данных в виде Nested Tree,
// но, учитывая, какой у таблицы сценарий работы, это было бы избыточно.

// Менее затратно было бы сделать объединение данных по parentId, а затем
// получать и дополнять "карту" данных таблицы по ходу запросов пользователем.

async function getDataGroupByParentId(): Promise<Map<number, DataRow[]>> {
    const tableData: DataRow[] = (
        await getTableData()
    ).sort((a, b) => a.id > b.id ? 1 : -1)

    // Если в таблице могут быть значения, id которых МЕНЬШЕ, чем
    // их parentId, то проблемы уже не у нас, а у ответственного за БД

    const tableDataMap = new Map<number, DataRow[]>()

    tableData.forEach((row) => {
        const parent = tableDataMap.get(row.parentId)

        if (parent) {
            tableDataMap.get(row.parentId)?.push(row)
        }
        else {
            tableDataMap.set(row.parentId, [row])
        }
    })

    return tableDataMap
}

export default getDataGroupByParentId
