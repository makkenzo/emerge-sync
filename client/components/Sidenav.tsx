import Link from 'next/link';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Sidenav = () => {
    const router = useRouter();

    return (
        <aside className="bg-[#102E44] inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl">
            <div className="relative border-b border-white/20">
                <Link href="/dashboard" className="flex items-center gap-4 py-6 px-8">
                    <Image src="/brand-logo.png" alt="brand logo" width={300} height={40} />
                </Link>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li>
                        <Link href="/dashboard">
                            <button
                                type="button"
                                className={`w-full rounded-md flex items-center gap-4 px-4 py-4 capitalize hover:bg-slate-500 ${
                                    router.pathname === '/dashboard' ? 'bg-white text-black' : 'text-white'
                                }`}
                            >
                                <AiFillHome />
                                Dashboard
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="absolute bottom-8 left-8 w-[256px]">
                <Link href="/logout">
                    <button
                        type="button"
                        className="w-full rounded-md flex items-center gap-4 px-4 py-4 capitalize text-white hover:bg-slate-500"
                    >
                        <AiOutlineLogout />
                        Logout
                    </button>
                </Link>
            </div>
        </aside>
    );
};

export default Sidenav;
