import axios from 'axios'; // Импортируем axios

const instance = axios;
import { RoleModel } from '@/types';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

interface RoleDetailsProps {
    role: RoleModel;
    user: string;
    rules: Record<string, any>;
    setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    roleId: string | undefined;
}

const RoleDetails: React.FC<RoleDetailsProps> = ({ role, user, rules, roleId, setEditRole, setUserId }) => {
    const [username, setUsername] = useState('');
    // const [userId, setUserId] = useState('');

    useEffect(() => {
        role.name;
        rules;
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const fetchData = async () => {
            try {
                const response = await instance.get(`http://127.0.0.1:8000/user/${role.user_id}`, { headers }).then((res) => {
                    const { first_name, last_name } = res.data;
                    let fullName: string = '';

                    if (first_name) {
                        fullName += first_name;
                    }
                    if (last_name) {
                        if (fullName.length > 0) {
                            fullName += ' ';
                        }
                        fullName += last_name;
                    }

                    setUsername(fullName);
                    setUserId(res.data._id); //зачем?
                });
            } catch (ex) {
                console.error(ex);
            }
        };

        fetchData();
    }, []);

    const handleDeleteRole = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const params = {
            role_id: roleId,
        };
        try {
            const response = await instance.delete('https://excelsync.5dev.kz/role/', { params, headers });

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <div className="p-4 space-y-4 w-1/3 bg-white">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Описание роли</h2>
                <div className="flex space-x-2">
                    <Button
                        onClick={handleDeleteRole}
                        color="red"
                        size="sm"
                        className="flex items-center gap-1  text-white rounded-md  transition duration-300"
                    >
                        <AiFillEdit size={15} />
                        Удалить
                    </Button>
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
            </div>
            <div className="shadow-md p-2 rounded-lg">
                <p className="mb-2">
                    <span className="font-bold">Наименование роли:</span> {role.name}
                </p>
                <p className="mb-2">
                    <span className="font-bold">Применяется к пользователю:</span> {username}
                </p>
            </div>
        </div>
    );
};

export default RoleDetails;
