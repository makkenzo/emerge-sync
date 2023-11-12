import { UserData } from '@/types';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { EditProfileInfoModal } from '.';

const ProfileInfo: React.FC<{ userData: UserData }> = ({ userData }) => {
    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);

    const handleEditDetails = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
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
                    <button onClick={handleEditDetails} className="text-blue-gray-500">
                        <AiFillEdit size={20} className="hover:text-black" />
                    </button>
                </CardHeader>
                <CardBody className="p-0">
                    <ul className="flex flex-col gap-4 p-0">
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Имя:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData.first_name !== '' ? userData.first_name : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Фамилия:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData.last_name !== '' ? userData.last_name : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Номер телефона:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData.phone !== '' ? userData.phone : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                E-mail:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData.email !== '' ? userData.email : 'Данных нет..'}
                            </Typography>
                        </li>
                        {/* <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Расположение:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData?.details['location'] !== '' ? userData?.details['location'] : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Пол:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500 capitalize">
                                {userData?.details['gender'] !== '' ? userData?.details['gender'] : 'Данных нет..'}
                            </Typography>
                        </li> */}
                    </ul>
                </CardBody>
            </Card>
            <EditProfileInfoModal isModalOpen={isModalOpen} closeModal={closeModal} userData={userData} />
        </div>
    );
};

export default ProfileInfo;
