import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { getUsers, logout, getClients } from '../../auth/instance';
import arrowIcon from './../../images/arrowIcon.svg';
import editIcon from './../../images/editIcon.svg';
import IClient from '../../types/IClient';
import StatusModal from '../../components/StatusModal/StatusModal';


interface IUser {
    fullname: string,
    login: string
}



const Home: React.FC = () => {

    const { authUser } = useAuth();

    //@ts-ignore
    const fullname = authUser.fullname;
    //@ts-ignore
    const login = authUser.login;


    const [users, setUsers] = useState<IUser[]>([]);
    const [clients, setClients] = useState<IClient[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>(fullname);
    const [selectedClient, setSelectedClient] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [statusModal, setStatusModal] = useState<boolean>(false);


    const navigate = useNavigate();

    

    

    document.title = 'Главная';

    const auth = localStorage.getItem('authUser')

    useEffect(() => {
        if (!auth) {
            navigate('/auth/login')
        } else {
            return;
        }
    }, [auth]);

    useEffect(() => {
        const getData = async () => {
            const data = await getUsers();

            const users = [...data, {fullname: 'Все клиенты', login: '__'}]

            setUsers(users);
        }

        getData();
    }, [users]);

    const getData = async  (fullname: string) => {

        if (fullname === 'Все клиенты') {
            const data = await getClients();

            setClients(data);
        } else {
            const data = await getClients(fullname);

            setClients(data);
        }
        

        
    }

    const selectUser = (selectfullname: string) => {
        setSelectedUser(selectfullname);

        getData(selectedUser);
    }

    

    useEffect(() => {
        getData(selectedUser)
    }, [selectedUser, clients]);



    const editStatus = (resFullname: string, _id: string) => {
        if (resFullname === fullname) {
            setSelectedClient(_id);

            setStatusModal(true);
        } else {
            return;
        }
    }


    return (
        <main className={styles.window}>
            {statusModal && <StatusModal _id={selectedClient} open={statusModal} setOpen={setStatusModal}/>}
            <header>
                <h2>Управление клиентами</h2>
                <h4 onClick={() => setModal(!modal)}>{fullname}<img src={arrowIcon} width={30} height={30}/></h4>
                {modal && <Modal login={login}/>}
            </header>
            <section className={styles.container}>
                <aside>
                    <h5>Ответственный</h5>
                    <ul>
                        {users.map((user, index) => {
                            return (
                                <li key={index} onClick={() => selectUser(user.fullname)} style={{'color': selectedUser === user.fullname ? '#6464ff' : '#fff'}}>{user.fullname}</li>
                            )
                        })}
                    </ul>
                </aside>
                <div className={styles.clients}>
                    <h2>Клиенты</h2>
                    <ul>
                        {clients.map((client, index) => {
                            return (
                                <li  key={index}><p style={{'width': 300}}>{client.surname} {client.name} {client.patronymic}</p> <p style={{'width': 300}}>{client.accNumber}</p> <p style={{'width': 200}}>{client.INN}</p> <p onClick={() => editStatus(client.resFullname, client._id)} className={fullname === client.resFullname ? styles.status : ''} style={{'width': '400'}}>{client.status} {fullname === client.resFullname && <img src={editIcon} width={20} height={20} />}</p> <p style={{'width': 400}}>{client.resFullname}</p></li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </main>
    )
}

interface ModalPropsType {
    login: string
}

const Modal: React.FC<ModalPropsType> = ({login}) => {

    const LogOut = async  () => {
        const res = await logout();
        localStorage.clear();

        console.log(res);
    }


    return (
        <div className={styles.modal}>
            <ul>
                <li>{login}</li>
                <li>удалить аккаунт</li>
                <li onClick={LogOut}>выйти</li>
            </ul>
        </div>
    )
}



export default Home;