import type { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import WhyDoesItAlwaysHappensLikeThis from '../question2.jsx'
import MainPage from './pages/MainPage'
import MainPage2 from './pages/MainPage2'
import './App.css'

const App: FC = () => {
    return (
        <Routes>
            <Route index element={<MainPage />} />
            <Route path="2" element={<MainPage2 />} />
            <Route path="question" element={<WhyDoesItAlwaysHappensLikeThis />} />
        </Routes>
    )
}

export default App
