import type { PayloadAction } from '@reduxjs/toolkit'
import type { DataRow, TableMapSortOptions } from '../types'
import { createSlice } from '@reduxjs/toolkit'
import getTableData from '../backend'

interface TableState {
    tableMap: Record<number, DataRow[]>
    expanded: Record<number, boolean>
    hideInactive: boolean
}

const initialTableState: TableState = {
    tableMap: {},
    expanded: {},
    hideInactive: false,
}

const tableSlice = createSlice({
    name: 'table',

    initialState: initialTableState,

    reducers: {
        initTable(state, action: PayloadAction<DataRow[]>) {
            state.tableMap = {}
            state.expanded = {}

            action.payload.forEach((row) => {
                if (!state.tableMap[row.parentId]) {
                    state.tableMap[row.parentId] = []
                }

                state.tableMap[row.parentId]?.push(row)
                state.expanded[row.id] = false
            })
        },

        toggleInactive(state) {
            state.hideInactive = !state.hideInactive
        },

        toggle(state, action: { payload: number }) {
            state.expanded[action.payload] = !state.expanded[action.payload]
        },

        toggleAll(state, action: { payload: boolean }) {
            for (const num of Object.keys(state.expanded)) {
                state.expanded[+num] = action.payload
            }
        },
    },
})

export const { initTable, toggleInactive, toggle, toggleAll } = tableSlice.actions

export default tableSlice.reducer

export function createTableMap(sortBy: TableMapSortOptions, reverse: boolean) {
    return async (dispatch: any) => {
        const tableData: DataRow[] = (await getTableData()).sort(
            (a, b) => (
                (sortBy === 'id'
                    ? a.id - b.id
                    : (a[sortBy] as string).localeCompare(b[sortBy] as string)
                ) * (reverse ? -1 : 1)
            ),
        )
        dispatch(initTable(tableData))
    }
}
