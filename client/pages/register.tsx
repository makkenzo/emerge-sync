import instance from '@/lib/api';
import { registerUser } from '@/redux/slices/authSlice';
import { Typography } from '@material-tailwind/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillLock, AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';
const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const userdata=new Cookies();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            return toast.error('Имя пользователя и пароль обязательны для входа.');
        } else {
            if (password !== repeatPassword) {
                return toast.error('Пароли должны совпадать.');
            }
            try {
                const response = await instance.post('/user', {
                    username,
                    password,
                });
                const user_id = response.data;

                const reponse2 = await instance.post('/user/login', {
                    username,
                    password,
                });
                const { accsess_token } = reponse2.data;

                if (accsess_token) {
                    localStorage.setItem('token', accsess_token);
                    localStorage.setItem('userId', user_id);
                    userdata.set("userName",username,{path:'/auth'})
                    userdata.set("password",password,{path:'/auth'})
                    router.push('/dashboard/files');
                } else {
                    return toast.error('Ошибка аутентификации: Повторите попытку позже');
                }
            } catch (error: any) {
                toast.error(`Ошибка при попытке входа: ${error.response.data.message}`);
            }
        }
    };

    return (
        <>
            <Head>
                <title>ExcelStockList | Регистрация</title>
            </Head>
            <ToastContainer position="top-center" />
            <div className="min-h-screen bg-cover bg-center bg-[#0d6e6d] flex items-center justify-center">
                <div className="bg-white p-8 rounded-md shadow-md auth__neumorphism w-[400px]">
                    <h2 className="text-3xl font-semibold mb-8 text-white text-center">Регистрация</h2>
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
                    <div className="mb-4 flex items-center relative">
                        <AiFillLock className="absolute ml-2" />
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="border border-gray-100 p-2 pl-8 focus:outline-none rounded-md w-full"
                        />
                    </div>
                    <Typography variant="h6" className="text-white font-normal my-4">
                        Уже есть аккаунт?{' '}
                        <a
                            href="/auth"
                            className="underline underline-offset-4 text-blue-gray-200 hover:text-blue-gray-400"
                        >
                            Войти
                        </a>
                    </Typography>
                    <button
                        onClick={handleLogin}
                        type="button"
                        className="bg-[#398d8c] hover:bg-[#378986] text-white py-2 px-4 rounded-md w-full"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
