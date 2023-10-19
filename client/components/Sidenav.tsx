import Link from 'next/link';
import { AiFillHome, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidenav = () => {
    const router = useRouter();

    type UserData = {
        username: string;
        role: string;
        profilePic: string;
    };

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/auth');
        } else {
            const userId = localStorage.getItem('userId');

            axios.get(`http://localhost:5000/api/v1/users/${userId}`).then((response) => {
                setUserData(response.data);
            });
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        router.push('/');
    };

    return (
        <aside className="bg-[#102E44] inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl">
            <div className="relative border-b border-white/20">
                <Link href="/dashboard/files" className="flex items-center gap-4 py-6 px-8">
                    <Image src="/brand-logo.png" alt="brand logo" width={300} height={40} />
                </Link>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1 space-y-1">
                    <li>
                        <Link href="/dashboard/files">
                            <button
                                type="button"
                                className={`w-full rounded-md flex items-center gap-4 px-4 py-4 capitalize hover:bg-blue-gray-500 ${
                                    router.pathname === '/dashboard/files' ? 'bg-white text-black' : 'text-white'
                                }`}
                            >
                                <AiFillHome />
                                Dashboard
                            </button>
                        </Link>
                    </li>

                    <li>
                        <Link href={'/dashboard/profile'}>
                            <button
                                type="button"
                                className={`w-full rounded-md flex items-center gap-4 px-4 py-4 hover:bg-blue-gray-500 ${
                                    router.pathname === '/dashboard/profile' ? 'bg-white text-black' : 'text-white'
                                }`}
                            >
                                <AiOutlineUser />
                                Profile
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="absolute bottom-8 left-8 w-[256px]">
                <button
                    onClick={handleLogOut}
                    type="button"
                    className="w-full rounded-md flex items-center gap-4 px-4 py-4 capitalize text-white hover:bg-blue-gray-500"
                >
                    <AiOutlineLogout />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidenav;
