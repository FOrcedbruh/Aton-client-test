import styles from './Login.module.css'
import { useForm } from 'react-hook-form'
import { signin } from '../../auth/instance'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useEffect } from 'react'

interface FormStateType {
    login: string,
    password: string,
}


const Login: React.FC = () => {

    const navigate = useNavigate();

    document.title = 'Вход в аккаунт';

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

        const userData = await signin(login, password);

        //@ts-ignore
        setAuthUser(userData);

        localStorage.setItem('authUser', JSON.stringify(userData));
        
        reset();

        navigate('/');
    }
    
    
    return (
        <section className={styles.window}>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder='Логин' {...register('login', {
                    required: 'Заполните логин'
                })}/>
                <input className={styles.input} type="password" placeholder='Пароль' {...register('password', {
                    required: 'Заполните поле с паролем',
                    minLength: {
                        value: 6,
                        message: 'Пароль минимум 6 символов'
                    }
                })}/>

                <input disabled={!isValid} style={{'backgroundColor': isValid ? '#6464ff' : '#636363', 'cursor': isValid ? 'pointer' : 'not-allowed'}} className={styles.submitBtn} type="submit" value={'Войти'}/>
            </form>
            <h5>Еще нет аккаунта?  <Link to={'/auth/registration'}>Создать</Link></h5>
        </section>
    )
}

export default Login;