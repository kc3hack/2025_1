'use client'

import EditPartsMenu from '../components/edit/EditPartsMenu'
import NextButton from '../components/edit/NextButton'
import ScorePanel from '../components/edit/ScorePanel'
import TipsPanel from '../components/edit/TipsPanel'
import styles from './styles.module.css'
import { useState } from 'react'
import PartsList from '../components/edit/PartsList'

export default function EditPage() {
    const [showPartsList, setShowPartsList] = useState(false)

    return (
        <div className={styles.container}>
            <EditPartsMenu onPartsListClick={() => setShowPartsList(true)} />
            <ScorePanel />
            <TipsPanel />
            <div className={styles.buttonGroup}>
                <NextButton type="retire" position="left" text="リタイア" />
                <NextButton type="rotate" position="center" text="回転" />
                <NextButton type="place" position="right" text="設置" />
            </div>
            {showPartsList && <PartsList onClose={() => setShowPartsList(false)} />}
        </div>
    )
}
