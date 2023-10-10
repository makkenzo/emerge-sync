import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import axios from 'axios';

import { Sidenav } from '@/components';
import { CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Avatar, Card } from '@material-tailwind/react';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { TbBrandTelegram } from 'react-icons/tb';
import { FaXTwitter } from 'react-icons/fa6';
import { UserData } from '@/types';

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            router.push('/auth');

            return;
        }

        try {
            axios.get(`http://localhost:5000/api/v1/users/${userId}`).then((response) => setUserData(response.data));
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <>
            <Head>
                <title>EmergeSync | Profile</title>
            </Head>
            <div className="min-h-screen bg-slate-200 flex">
                <Sidenav />
                <div className="container mx-auto pt-8">
                    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
                        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
                    </div>
                    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                        <CardBody className="p-4">
                            <div className="mb-10 flex gap-2">
                                <div className="flex flex-col items-center gap-6">
                                    <Avatar
                                        src={
                                            userData?.details.profilePic === ''
                                                ? '/users/default.jpg'
                                                : userData?.details.profilePic
                                        }
                                        alt="user pic"
                                        size="xl"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                </div>
                                <div className="h-full my-auto ml-2">
                                    <Typography variant="h5" className="mb-1" color="blue-gray">
                                        {userData?.username}
                                    </Typography>
                                    <Typography variant="small" className="font-normal text-blue-gray-600">
                                        {userData?.role.toUpperCase()}
                                    </Typography>
                                </div>
                            </div>
                            <div className="grid-cols-2 mb-12 grid gap-12 px-4">
                                <div>
                                    <Card color="transparent" shadow={false}>
                                        <CardHeader
                                            color="transparent"
                                            shadow={false}
                                            floated={false}
                                            className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
                                        >
                                            <Typography variant="h4" color="blue-gray">
                                                Информация профиля
                                            </Typography>
                                        </CardHeader>
                                        <CardBody className="p-0">
                                            <ul className="flex flex-col gap-4 p-0">
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        Имя:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['firstName'] !== ''
                                                            ? userData?.details['firstName']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        Фамилия:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['lastName'] !== ''
                                                            ? userData?.details['lastName']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        Номер телефона:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['phoneNumber'] !== ''
                                                            ? userData?.details['phoneNumber']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        E-mail:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['email'] !== ''
                                                            ? userData?.details['email']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        Расположение:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['location'] !== ''
                                                            ? userData?.details['location']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                                <li className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        Пол:
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500"
                                                    >
                                                        {userData?.details['gender'] !== ''
                                                            ? userData?.details['gender']
                                                            : 'пусто..'}
                                                    </Typography>
                                                </li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="flex flex-col items-start justify-center space-y-3">
                                    <button
                                        className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded${
                                            userData?.details.socialMedia.LinkedIn === ''
                                                ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                                                : 'bg-[#007ab9] hover:shadow-2xl transition-shadow ease-in-out'
                                        }`}
                                    >
                                        <AiFillLinkedin size={40} />
                                        <span>LinkedIn</span>
                                    </button>
                                    <button
                                        className={` text-white px-4 py-2 font-semibold text-2xl  inline-flex items-center space-x-2 rounded${
                                            userData?.details.socialMedia.Instagram === ''
                                                ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                                                : 'bg-gradient-to-r from-[#ffd600] via-[#ff0069] to-[#7638fa] hover:shadow-2xl transition-shadow ease-in-out'
                                        }`}
                                    >
                                        <AiFillInstagram size={40} />
                                        <span>Instagram</span>
                                    </button>
                                    <button
                                        className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded${
                                            userData?.details.socialMedia.Telegram === ''
                                                ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                                                : 'bg-[#26a4e3] hover:shadow-2xl transition-shadow ease-in-out'
                                        }`}
                                    >
                                        <TbBrandTelegram size={40} />
                                        <span>Telegram</span>
                                    </button>
                                    <button
                                        className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded ${
                                            userData?.details.socialMedia.X === ''
                                                ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                                                : 'bg-black hover:shadow-2xl transition-shadow ease-in-out'
                                        }`}
                                    >
                                        <FaXTwitter size={40} />
                                        <span>X</span>
                                    </button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Profile;
