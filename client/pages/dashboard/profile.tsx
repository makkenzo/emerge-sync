import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';


import { Sidenav, ProfileInfo } from '@/components';
import { CardBody, Typography } from '@material-tailwind/react';
import { Avatar, Card } from '@material-tailwind/react';
import { LogsData, UserData, XlsxDocument } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setIsLoading } from '@/redux/slices/loadingSlice';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios'; 

const instance = axios;
const Profile = () => {
    const [userData, setUserData] = useState<UserData>();
    const [logs, setLogs] = useState<LogsData[]>();
    const [workflows, setWorkflows] = useState<XlsxDocument[]>();
    const [matchingWorkflow, setMatchingWorkflow] = useState<XlsxDocument | undefined>(undefined);

    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);

    const handleEditProfilePicture = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        // Check if the token is not present in localStorage, and redirect to the login page
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth');
        }
    }, [router]);
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            router.push('/auth');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            instance.get(`https://excelsync.5dev.kz/user`, { headers }).then((response) => {
                setUserData(response.data);
                dispatch(setIsLoading(false));
            });

            instance.get(`https://excelsync.5dev.kz/workflow_log`, { headers }).then((response) => setLogs(response.data));

            instance.get('https://excelsync.5dev.kz/workflow', { headers }).then((res) => {
                setWorkflows(res.data);
            });
        } catch (error) {
            console.error(error);
            dispatch(setIsLoading(false));
        }
    }, []);

    useEffect(() => {
        const filter = () => {
            const workflowId = logs?.[0]?.workflow_id;

            // Check if workflows is defined and not empty
            if (workflows && workflows.length > 0) {
                const matchingWorkflow = workflows.find((workflow) => workflow._id === workflowId);

                if (matchingWorkflow) {
                    // ('Matching Workflow:', matchingWorkflow);
                    setMatchingWorkflow(matchingWorkflow);
                }
            }
        };

        // Check if workflows is defined
        if (workflows) {
            filter();
        }
    }, [workflows]);

    return (
        <>
            <Head>
                <title>ExcelStockList | Профиль</title>
            </Head>
            <div className="min-h-screen bg-slate-200 flex">
                <Sidenav />
                <div className="container mx-auto pt-8">
                    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
                        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
                    </div>
                    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                        <CardBody className="p-4">
                            {!isLoading && userData ? (
                                <>
                                    <div className="mb-10 flex gap-2">
                                        <div className="flex flex-col items-center gap-6">
                                            <Avatar
                                                src="/users/default.jpg"
                                                alt="user pic"
                                                size="xl"
                                                className="p-0.5"
                                                variant="rounded"
                                                withBorder={true}
                                            />
                                        </div>
                                        <div className="h-full my-auto ml-2">
                                            <Typography variant="h5" className="mb-1" color="blue-gray">
                                                {userData.first_name !== '' ? userData.first_name : 'Пользователь'}
                                            </Typography>
                                            {/* <Typography variant="small" className="font-normal text-blue-gray-600">
                                                {userData.role.toUpperCase()}
                                            </Typography> */}
                                        </div>
                                        {/* <button onClick={handleEditProfilePicture} className="text-blue-gray-500 ml-4">
                                            <AiFillEdit size={20} className="hover:text-black" />
                                        </button> */}
                                    </div>
                                    <div className="grid-cols-2 mb-12 grid gap-12 px-4">
                                        <ProfileInfo userData={userData} />
                                        {/* <SocialMediaButtons userData={userData} /> */}
                                        <div>
                                            <Typography variant="h5" className="mb-1" color="blue-gray">
                                                Логирование
                                            </Typography>
                                            <div className="max-h-60 overflow-y-auto p-4 bg-gray-100 rounded-md">
                                                <ul className="list-disc pl-4">
                                                    {logs &&
                                                        workflows &&
                                                        logs.map((log) => (
                                                            <li key={log._id} className="mb-2">
                                                                <strong className="text-blue-500">{log.op}</strong>:{' '}
                                                                {log.change}
                                                                {matchingWorkflow && <p>{matchingWorkflow.name}</p>}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center my-4">
                                    <div role="status">
                                        {/* prettier-ignore */}
                                        <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* {userData && (
                <EditProfilePictureModal isModalOpen={isModalOpen} closeModal={closeModal} userData={userData} />
            )} */}
        </>
    );
};

export default Profile;
