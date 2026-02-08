import type { FC } from 'react'
import type { Dispatch, State } from '../store'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableRow from '../components/TableRow'
import { createTableMap, toggleAll } from '../store/tableSlice'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
    const dispatch: Dispatch = useDispatch()
    const tableMap = useSelector(
        (state: State) => state.table.tableMap,
    )

    const rows = tableMap[0] ?? []

    useEffect(() => {
        dispatch(createTableMap('id', false))
    }, [])

    return (
        <div className={styles['page-wrap']}>
            <header>
                <h1>Сведения о клиентах</h1>
            </header>

            {(rows.length > 0)
                ? (
                        <div className={styles['table-wrap']}>
                            <main>
                                {/* <TableHead /> */}

                                {rows.map(row => (
                                    <TableRow key={row.id} data={row} />
                                ))}
                            </main>

                            <aside>
                                <button onClick={() => dispatch(createTableMap('id', true))} />
                                <button onClick={() => dispatch(createTableMap('id', false))} />
                                <button onClick={() => dispatch(createTableMap('name', true))} />
                                <button onClick={() => dispatch(createTableMap('name', false))} />
                                <button onClick={() => dispatch(createTableMap('email', true))} />
                                <button onClick={() => dispatch(createTableMap('email', false))} />
                                <button onClick={() => dispatch(createTableMap('balance', true))} />
                                <button onClick={() => dispatch(createTableMap('balance', false))} />
                                <button onClick={() => dispatch(toggleAll(true))} />
                                <button onClick={() => dispatch(toggleAll(false))} />
                                {/* <TiledButton /> */}
                            </aside>
                        </div>
                    )
                : (
                        <p>Загрузка!</p>
                    )}
        </div>
    )
}

export default MainPage
