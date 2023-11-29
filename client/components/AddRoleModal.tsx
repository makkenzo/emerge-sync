import instance from '@/lib/api';
import { UserData } from '@/types';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

interface AddRoleModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    fileId: string | string[];
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isModalOpen, closeModal, fileId }) => {
    const [role, setRole] = useState('');
    const [users, setUsers] = useState<UserData[]>();
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchKeys = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await instance.get<UserData[]>(`/user/users/${fileId}`, { headers });
                setUsers(response.data);

                if (response.data.length > 0) {
                    setSelectedUser(response.data[0].user_id);
                }
            } catch (error) {
                console.error('Ошибка при получении данных с сервера:', error);
            }
        };

        fetchKeys();
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            name: role,
            rule: [],
            user_id: selectedUser,
            is_delete: false,
            workflow_id: fileId,
            can_modify: false,
        };

        try {
            const response = await instance.post('/role/', data, { headers });

            if (response.status === 201) {
                window.location.reload();
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header>Добавить роль</Modal.Header>
            <Modal.Body>
                {users && users.length > 0 ? (
                    <>
                        <div className="mb-2">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Роль" />
                                <TextInput onChange={(e) => setRole(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="mb-2 block">
                                <Label htmlFor="fields" value="Пользователь" />
                                {users && (
                                    <Select
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                        value={selectedUser || ''}
                                        defaultValue={users[0].first_name}
                                    >
                                        {users.map((key, index) => (
                                            <option key={key._id} value={key._id}>
                                                {key.first_name} {key.last_name}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </div>
                        <div className="w-full mt-4">
                            <Button
                                onClick={handleSave}
                                className="bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                            >
                                Сохранить
                            </Button>
                        </div>
                    </>
                ) : (
                    <h1>Всем пользователяем уже назначены роли.</h1>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default AddRoleModal;
