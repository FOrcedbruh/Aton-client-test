import axios from "axios";
import IClient from "../types/IClient";



const instance = axios.create({
    baseURL: 'https://aton-server-test.onrender.com/',
    withCredentials: true
})


export const registration = async (login: string, password: string, fullname: string) => {
    const res = await  instance.post('auth/registration', {
        login,
        password,
        fullname
    });

    return res.data;
}

export const signin = async (login: string, password: string) => {
    const res = await instance.post('auth/login', {
        login,
        password
    });

    return res.data;
}

export const getUsers = async () => {
    const res = await instance.get('users');

    
    return res.data;
}

export const logout = async () => {
    const res = await instance.post('auth/logout');

    return res.data;
}

export const getClients = async (fullname?: string): Promise<IClient[]> => {
    if (fullname) {
        const res = await instance.post('clients', {
            resFullname: fullname
        });

        return res.data;
    }
    else {
        const res = await instance.post('clients');

        return res.data;
    }
}

export const updateStatus = async (_id: string, status: string) => {
    const res = await instance.post('editStatus', {
        status,
        _id
    });

    
    return res.data;
}