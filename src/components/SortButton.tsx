import type { FC } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'
import styles from './SortButton.module.css'

const SortButton: FC<{
    label: string
    flex: number
    isSelected?: boolean
    isReversed?: boolean
    onClick: () => void
}> = ({ label, flex, isSelected = false, isReversed = false, onClick }) => {
    return (
        <button
            className={`${styles['sort-btn']} ${isSelected ? 'selected' : ''}`}
            style={{ flex }}
            onClick={onClick}
        >
            {(!isSelected || flex > 5) && label}

            {isSelected && (
                isReversed
                    ? (<ChevronUp />)
                    : (<ChevronDown />)
            )}
        </button>
    )
}

export default SortButton
