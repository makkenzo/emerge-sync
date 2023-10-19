import { ProfileIndoModalTypes } from '@/types';
import { Modal, Button, Label, FileInput } from 'flowbite-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFile, setThumbnail, setUrl } from '@/redux/slices/pfpSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';

const EditProfilePictureModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const file = useSelector((state: RootState) => state.pfp.file);
    const url = useSelector((state: RootState) => state.pfp.url);
    const thumbnail = useSelector((state: RootState) => state.pfp.thumbnail);

    const dispatch = useDispatch();

    const { edgestore } = useEdgeStore();

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(setFile({ file: e.target.files[0] }));
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const res = await edgestore.myPublicImages.upload({ file });

                dispatch(setUrl({ url: res.url }));
                dispatch(setThumbnail({ thumbnail: res.thumbnailUrl }));

                try {
                    const getResponse = await axios.get(`http://localhost:5000/api/v1/users/${userData._id}`);

                    const oldPfp = getResponse.data.details.profilePic;

                    const postResponse = await axios.put(
                        `http://localhost:5000/api/v1/users/update-pfp/${userData._id}`,
                        {
                            url: res.url,
                        }
                    );

                    await edgestore.myPublicImages.delete({
                        url: oldPfp,
                    });

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
            <Modal.Header className="mb-2">
                <h3 className="text-xl font-medium text-gray-900 ml-4 mt-2">Редактировать фото профиля</h3>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Фото профиля" />
                    </div>
                    <FileInput onChange={(e) => handleSelectFile(e)} id="file" />
                </div>
                <div className="w-full mt-4">
                    <Button onClick={handleUpload}>Сохранить</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfilePictureModal;
