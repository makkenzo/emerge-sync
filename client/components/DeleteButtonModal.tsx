'use client';

import { useState } from 'react';

import { Button, Modal } from 'flowbite-react';

import axios from 'axios'; // Импортируем axios

const instance = axios;

import { AiFillDelete } from 'react-icons/ai';
import { PiWarningCircleBold } from 'react-icons/pi';

const DeleteButtonModal = ({ file, fileId }: { file: string; fileId: string }) => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    const handleDeleteDocument = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };
            const response = await instance.delete(`https://excelsync.5dev.kz/workflow/${fileId}`, { headers });

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button className="text-red-600 hover:text-black" onClick={() => props.setOpenModal('pop-up')}>
                <AiFillDelete size={20} />
            </button>
            <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <PiWarningCircleBold className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Вы уверены, что хотите удалить файл "{file}"?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteDocument}>
                                Да, я уверен
                            </Button>
                            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteButtonModal;
