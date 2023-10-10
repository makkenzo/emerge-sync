import { UserData } from '@/types';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { Tooltip } from 'flowbite-react';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';

const ProfileInfo: React.FC<{ userData: UserData }> = ({ userData }) => {
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
                    {/* TODO: Fix tooltip content */}
                    <Tooltip content="Редактировать профиль">
                        <AiFillEdit size={20} className="cursor-pointer text-blue-gray-500" />
                    </Tooltip>
                </CardHeader>
                <CardBody className="p-0">
                    <ul className="flex flex-col gap-4 p-0">
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Имя:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData?.details['firstName'] !== ''
                                    ? userData?.details['firstName']
                                    : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Фамилия:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData?.details['lastName'] !== '' ? userData?.details['lastName'] : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                Номер телефона:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData?.details['phoneNumber'] !== ''
                                    ? userData?.details['phoneNumber']
                                    : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                E-mail:
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-500">
                                {userData?.details['email'] !== '' ? userData?.details['email'] : 'Данных нет..'}
                            </Typography>
                        </li>
                        <li className="flex items-center gap-4">
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
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfileInfo;
