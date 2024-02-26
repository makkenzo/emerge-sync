import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiFillLock, AiOutlineUser } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'; // Импортируем axios

const instance = axios;
import { loginUser } from '@/redux/slices/authSlice';
import { Typography } from '@material-tailwind/react';
import { registerLicense } from '@syncfusion/ej2-base';
import Cookies from 'universal-cookie';
import Head from 'next/head';

const Auth = () => {
    registerLicense('ORg4AjUWIQA/Gnt2VlhhQlJCfV5DQmVWfFN0RnNRdVt0flZBcC0sT3RfQF5iSX5Udk1mXH1bdHJQQg==');
    const userdata = new Cookies();

    const [username, setUsername] = useState(userdata.get('userName') ?? '');
    const [password, setPassword] = useState(userdata.get('password') ?? '');

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
                const response = await instance.post('https://excelsync.5dev.kz/user/login', {
                    username,
                    password,
                });
                const { accsess_token } = response.data;

                const headers = {
                    Authorization: `Bearer ${accsess_token}`,
                    'Content-Type': 'multipart/form-data',
                };

                const getUserId = await instance.get('https://excelsync.5dev.kz/user', { headers });

                const { user_id } = getUserId.data;

                if (accsess_token) {
                    // dispatch(loginUser({ accsess_token, userId }));

                    localStorage.setItem('token', accsess_token);
                    localStorage.setItem('userId', user_id);
                    userdata.set('userName', username, { path: '/auth' });
                    userdata.set('password', password, { path: '/auth' });
                    router.push('/dashboard/files');
                } else {
                    toast.error('Ошибка аутентификации: неверный логин или пароль');
                }
            } catch (error: any) {
                toast.error(`Неверный логин или пароль`);
                console.error(error);
            }
        }
    };

    return (
        <>
            <Head>
                <title>ExcelStockList | Авторизация</title>
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
                    <Typography variant="h6" className="text-white font-normal my-4 text-center">
                        Еще не зарегистрированы?{' '}
                        <a
                            href="/register"
                            className="underline underline-offset-4 text-blue-gray-200 hover:text-blue-gray-400"
                        >
                            Зарегистрироваться
                        </a>
                    </Typography>
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
