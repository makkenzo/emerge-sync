// components/RoleDetails.tsx

import instance from '@/lib/api';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

interface RoleDetailsProps {
    role: string;
    user: string;
    rules: Record<string, any>;
    setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleDetails: React.FC<RoleDetailsProps> = ({ role, user, rules, setEditRole }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const fetchData = async () => {
            const response = await instance
                .get(`/user/${user}`, { headers })
                .then((res) => setUsername(res.data.first_name));
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 space-y-4 w-1/3 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Детали роли</h2>
                <Button
                    onClick={() => setEditRole(true)}
                    color="blue"
                    size="sm"
                    className="flex items-center gap-1 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                >
                    <AiFillEdit size={15} />
                    Изменить
                </Button>
            </div>
            <p className="mb-2">
                <span className="font-bold">Роль:</span> {role}
            </p>
            <p className="mb-2">
                <span className="font-bold">Пользователь:</span> {username}
            </p>
            <p className="mb-2">
                <span className="font-bold">Поля:</span>
            </p>
            <ul className="list-disc pl-4 mb-4">
                {Object.entries(rules).map(([key, value]) => (
                    <li key={key}>{key}</li>
                ))}
            </ul>
        </div>
    );
};

export default RoleDetails;
