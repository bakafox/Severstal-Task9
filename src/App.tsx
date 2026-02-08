import type { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'

const App: FC = () => {
    return (
        <Routes>
            <Route index element={<MainPage />} />
        </Routes>
    )
}

export default App
