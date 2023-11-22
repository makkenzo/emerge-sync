import instance from '@/lib/api';
import { RoleModalTypes } from '@/types';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

const AddRoleModal = ({ isModalOpen, closeModal, fileId }: RoleModalTypes) => {
    const [role, setRole] = useState('');
    const [keys, setKeys] = useState({});

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            name: role,
            rule: [],
            user_id: '',
            is_delete: false,
            workflow_id: fileId,
        };

        const response = await instance.post('/role/', data, { headers });

        if (response.status === 201) {
            window.location.reload();
        }
    };

    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header>Добавить роль</Modal.Header>
            <Modal.Body>
                <div className="mb-2">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Роль" />
                        <TextInput onChange={(e) => setRole(e.target.value)} />
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
            </Modal.Body>
        </Modal>
    );
};

export default AddRoleModal;
