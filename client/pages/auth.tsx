import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineUser, AiFillLock } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import { loginUser } from '@/redux/slices/authSlice';
import axios from 'axios';
import Head from 'next/head';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.push('/dashboard/files');
        }
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Имя пользователя и пароль обязательны для входа.');
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/v1/users/login', {
                    username,
                    password,
                });
                const { token, userId } = response.data;

                if (token) {
                    dispatch(loginUser({ token, userId }));

                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);

                    router.push('/dashboard/files');
                } else {
                    toast.error('Ошибка аутентификации: Токен не получен.');
                }
            } catch (error: any) {
                toast.error(`Ошибка при попытке входа: ${error.response.data.message}`);
            }
        }
    };

    return (
        <>
            <Head>
                <title>EmergeSync | Authentication</title>
            </Head>
            <ToastContainer position="top-center" />
            <div className="min-h-screen bg-cover bg-center bg-[#0d6e6d] flex items-center justify-center">
                <div className="bg-white p-8 rounded-md shadow-md auth__neumorphism w-[400px]">
                    <h2 className="text-3xl font-semibold mb-8 text-white text-center">Авторизация</h2>
                    <div className="mb-4 flex items-center relative">
                        <AiOutlineUser className="absolute ml-2" />
                        <input
                            type="text"
                            placeholder="Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-100 p-2 pl-8 focus:outline-none rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4 flex items-center relative">
                        <AiFillLock className="absolute ml-2" />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-100 p-2 pl-8 focus:outline-none rounded-md w-full"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        type="button"
                        className="bg-[#398d8c] text-white py-2 px-4 rounded-md w-full"
                    >
                        Войти
                    </button>
                </div>
            </div>
        </>
    );
};

export default Auth;
