import { ProfileIndoModalTypes } from '@/types';
import { Modal, Button, Label, FileInput } from 'flowbite-react';

const EditProfilePictureModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const handleSaveChanges = () => {};

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
                    <FileInput id="file" />
                </div>
                <div className="w-full mt-4">
                    <Button onClick={handleSaveChanges}>Сохранить</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfilePictureModal;
