import type { FC, ReactNode } from 'react'

import styles from './AsideButton.module.css'

const AsideButton: FC<{
    children: ReactNode
    isActive?: boolean
    onClick: () => void
}> = ({ children, isActive = false, onClick }) => {
    return (
        <button
            className={`${styles['aside-btn']} ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default AsideButton
