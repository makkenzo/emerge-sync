import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import axios from 'axios';

import { Sidenav, ProfileInfo, SocialMediaButtons } from '@/components';
import { CardBody, Typography } from '@material-tailwind/react';
import { Avatar, Card } from '@material-tailwind/react';
import { UserData } from '@/types';

const Profile = () => {
    const [userData, setUserData] = useState<UserData>();

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
                            {userData && (
                                <div className="grid-cols-2 mb-12 grid gap-12 px-4">
                                    <ProfileInfo userData={userData} />
                                    <SocialMediaButtons userData={userData} />
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Profile;
