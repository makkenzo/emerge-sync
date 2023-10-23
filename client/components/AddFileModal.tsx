import { useEdgeStore } from '@/lib/edgestore';
import { setFile, setUrl } from '@/redux/slices/pfpSlice';
import { RootState } from '@/redux/store';
import { ProfileIndoModalTypes } from '@/types';
import axios from 'axios';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddFileModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const [file, setFile] = useState<File>();
    const [assignedTo, setAssignedTo] = useState<string>();

    // const dispatch = useDispatch();

    const { edgestore } = useEdgeStore();

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                // const res = await edgestore.myPublicXlsxFiles.upload({ file });
                // console.log(res);

                // dispatch(setUrl({ url: res.url }));

                try {
                    const response = await axios.post(`http://localhost:5000/upload`, {
                        data: file,
                    });
                    // const response = await axios.post(`http://localhost:5000/api/v1/documents/add-document`, {
                    //     file: file.name,
                    //     filePath: res.url,
                    //     assignedTo: assignedTo,
                    // });

                    closeModal();
                    window.location.reload();
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header>Загрузить файл</Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Фото профиля" />
                    </div>
                    <FileInput onChange={(e) => handleSelectFile(e)} id="file" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="assignedTo" value="Прикреплен к" />
                    </div>
                    <TextInput onChange={(e) => setAssignedTo(e.target.value)} id="assignedTo" />
                </div>
                <div className="w-full mt-4">
                    <Button onClick={handleUpload}>Сохранить</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddFileModal;
