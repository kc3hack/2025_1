import EditPartsMenu from '../components/edit/EditPartsMenu'
import NextButton from '../components/edit/NextButton'
import styles from './styles.module.css'

export default function EditPage() {
    return (
        <div className={styles.container}>
            <EditPartsMenu />
            <div className={styles.buttonGroup}>
                <NextButton type="retire" position="left" text="リタイア" />
                <NextButton type="rotate" position="center" text="回転" />
                <NextButton type="place" position="right" text="設置" />
            </div>
        </div>
    )
}
