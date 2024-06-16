import styles from './Registration.module.css'
import { useForm } from 'react-hook-form'
import { registration } from '../../auth/instance'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useEffect } from 'react'


interface FormStateType {
    login: string,
    password: string,
    fullname: string
}


const Registration: React.FC = () => {
    document.title = 'Регистрация пользователя';

    const navigate = useNavigate();

    const { setAuthUser } = useAuth();


    const auth = localStorage.getItem('authUser');

    useEffect(() => {
        if (auth) {
            navigate('/')
        } else {
            return ;
        }
    }, [auth])


    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<FormStateType>({
        mode: 'onChange'
    });

    const onSubmit = async (data: FormStateType) => {
        const login: string = data.login;
        const password: string = data.password;
        const fullname: string = data.fullname;
        
        const userData = await registration(login, password, fullname);

        //@ts-ignore
        setAuthUser(userData);
        localStorage.setItem('authUser', JSON.stringify(userData));

        reset();

        navigate('/');
    }
    
    
    return (
        <section className={styles.window}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder='Логин' {...register('login', {
                    required: 'Заполните логин'
                })}/>
                <input className={styles.input} type="text" placeholder='ФИО' {...register('fullname', {
                    required: 'Введите ФИО(полностью)'
                })}/>
                <input className={styles.input} type="password" placeholder='Пароль' {...register('password', {
                    required: 'Заполните поле с паролем',
                    minLength: {
                        value: 6,
                        message: 'Пароль минимум 6 символов'
                    }
                })}/>

                <input disabled={!isValid} style={{'backgroundColor': isValid ? '#6464ff' : '#636363', 'cursor': isValid ? 'pointer' : 'not-allowed'}} className={styles.submitBtn} type="submit" value={'Зарегистрироваться'}/>
            </form>
            <h5>Уже есть аккаунт?  <Link to={'/auth/login'}>Войти</Link></h5>
        </section>
    )
}

export default Registration;