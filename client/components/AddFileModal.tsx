import axios from 'axios'; 

const instance = axios;
import { ProfileIndoModalTypes } from '@/types';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFileModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const [file, setFile] = useState<File>();

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                };

                const formData = new FormData();

                formData.append('file', file, file.name);

                const response = await instance.post('https://excelsync.5dev.kz/workflow', formData, { headers });

                closeModal();
                window.location.reload();
            } catch (error: any) {
                toast.error(`Ошибка: В файле присутствуют значения которые не поддерживаются`);
            }
        } else {
            toast.error('Файл не выбран');
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Modal show={isModalOpen} popup onClose={closeModal}>
                <Modal.Header>Загрузить файл</Modal.Header>
                <Modal.Body>
                    <div className="mb-2">
                        <div className="mb-2 block">
                            <Label htmlFor="file" value="Файл" />
                        </div>
                        <FileInput
                            onChange={(e) => handleSelectFile(e)}
                            id="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Button onClick={handleUpload} className="bg-[#607d8b]">
                            Сохранить
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddFileModal;
