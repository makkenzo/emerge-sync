import Link from 'next/link';
import { AiFillHome, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Sidenav = () => {
    const router = useRouter();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        router.push('/auth');
    };

    return (
        <aside className="bg-[#102E44] inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl">
            <div className="relative border-b border-white/20">
                <Link
                    href="/dashboard/files"
                    className="flex flex-col items-center justify-center mx-12 my-4 p-4 space-y-2 bg-white rounded-lg"
                >
                    <Image src="/am.jpg" alt="brand logo" width={300} height={40} />
                </Link>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1 space-y-1">
                    <li>
                        <Link href="/dashboard/files">
                            <button
                                type="button"
                                className={`w-full rounded-md flex items-center gap-4 px-4 py-4 capitalize hover:bg-blue-gray-500 ${
                                    router.pathname !== '/dashboard/profile' ? 'bg-white text-black' : 'text-white'
                                }`}
                            >
                                <AiFillHome />
                                Главная панель
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
                                Профиль
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
                    Выход
                </button>
            </div>
        </aside>
    );
};

export default Sidenav;
