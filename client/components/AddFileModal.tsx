import { ProfileIndoModalTypes } from '@/types';
import axios from 'axios';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFileModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const [file, setFile] = useState<File>();
    const [assignedTo, setAssignedTo] = useState<string>();

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('files', file);

                const uploadFile = await axios.post(`http://localhost:5000/upload-file`, formData);
                const responseData = uploadFile.data;

                const addDocRes = await axios.post(`http://localhost:5000/api/v1/documents/add-document`, {
                    file: responseData[0].filename,
                    filePath: responseData[0].path,
                    assignedTo: !assignedTo ? userData.username : assignedTo,
                });

                closeModal();
                window.location.reload();
            } catch (error: any) {
                toast.error(`Ошибка: ${error.response.data.message}`);
            }
        } else {
            toast.error('Вы не выбрали файл');
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
                        <FileInput onChange={(e) => handleSelectFile(e)} id="file" />
                    </div>
                    {userData.role === 'admin' && (
                        <div className="mb-2">
                            <div className="mb-2 block">
                                <Label htmlFor="assignedTo" value="Прикреплен к" />
                            </div>
                            <TextInput onChange={(e) => setAssignedTo(e.target.value)} id="assignedTo" />
                        </div>
                    )}
                    <div className="w-full mt-4">
                        <Button onClick={handleUpload}>Сохранить</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddFileModal;
