import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineUser, AiFillLock } from 'react-icons/ai';

import { RootState } from '@/redux/store';
import { loginUser } from '@/redux/slices/authSlice';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.auth.token);

    const handleLogin = async () => {
        if (!username || !password) {
            console.error('Имя пользователя и пароль обязательны для входа.');
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/v1/users/login', {
                    username,
                    password,
                });
                const { token } = response.data;

                if (token) {
                    dispatch(loginUser(token));

                    localStorage.setItem('token', token);

                    router.push('/dashboard');
                } else {
                    console.error('Ошибка аутентификации: Токен не получен.');
                }
            } catch (error) {
                console.error('Ошибка при попытке входа:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-blue-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Войти</h2>
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
                <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Войти
                </button>
            </div>
        </div>
    );
};

export default Auth;
