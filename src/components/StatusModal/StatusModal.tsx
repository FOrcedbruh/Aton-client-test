import { Dispatch, SetStateAction, useState } from "react";
import styles from './StatusModal.module.css';
import { updateStatus } from "../../auth/instance";


interface ModalPropsType {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    _id: string
}

const statuses: string[] = [
    'В работе',
    'Отказ',
    'Сделка закрыта'
]

const StatusModal: React.FC<ModalPropsType> = ({setOpen, _id}) => {


    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const editStatus = () => {
        updateStatus(_id, selectedStatus)


        setOpen(false);
    }


    return (
        <div className={styles.aura}>
            <div className={styles.modal}>
                <h3>Изменить статус</h3>
                {statuses.map(status => {
                    return (
                        <div key={status} style={{'backgroundColor': status === selectedStatus ? '#2b2b2b' : 'transparent', 'color': status === selectedStatus ? '#6464ff' : '#fff' }} onClick={() => setSelectedStatus(status)}>{status}</div>
                    )
                })}
                <button onClick={editStatus} className={styles.updateBtn}>Изменить статус</button>
            </div>
        </div>
        
    )
}

export default StatusModal;