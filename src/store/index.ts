import { configureStore } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'
import tableReducer from './tableSlice'

enableMapSet()

export const store = configureStore({
    reducer: {
        table: tableReducer,
    },
})

// Чтобы TypeScript не ругался
export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
