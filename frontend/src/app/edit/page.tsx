import styles from './styles.module.css'
import EditPartsMenu from '../components/EditPartsMenu'

export default function EditPage() {
    return (
        <div className={styles.container}>
            <EditPartsMenu />
        </div>
    )
}
