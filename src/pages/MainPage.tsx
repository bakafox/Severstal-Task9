import type { FC } from 'react'

import { useState } from 'react'

const MainPage: FC = () => {
    const [count, setCount] = useState(0)

    return (
        <main>
            <h1>Hello World!</h1>
            <p>UwU</p>
        </main>
    )
}

export default MainPage
