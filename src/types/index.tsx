export interface DataRow {
    id: number // Начинаются с 1
    parentId: number // 0 = нет предка
    isActive: boolean
    balance: string // '$1,23.45'
    name: string
    email: string
}

// Использовался до переноса функциональности в Redux:
// export interface NestedRow extends Omit<DataRow, 'parentId'> {
//     hasChildren: boolean
//     children: NestedRow[]
// }

export type TableMapSortOptions = 'id' | 'name' | 'email' | 'balance'
