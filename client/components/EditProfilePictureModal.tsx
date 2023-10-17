import { ProfileIndoModalTypes } from '@/types';
import { Modal, Button, Label, FileInput } from 'flowbite-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFile } from '@/redux/slices/pfpSlice';
import { ChangeEvent, useEffect, useState } from 'react';

const EditProfilePictureModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const dispatch = useDispatch();
    const file = useSelector((state: RootState) => state.pfp.file);

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(setFile({ file: e.target.files[0] }));
        }
    };

    const handleUpload = () => {
        console.log(file);
    };

    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header className="mb-2">
                <h3 className="text-xl font-medium text-gray-900 ml-4 mt-2">Редактировать фото профиля</h3>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Фото профиля" />
                    </div>
                    <FileInput
                        onChange={(e) => {
                            handleSelectFile(e);
                        }}
                        id="file"
                    />
                </div>
                <div className="w-full mt-4">
                    <Button onClick={handleUpload}>Сохранить</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfilePictureModal;
