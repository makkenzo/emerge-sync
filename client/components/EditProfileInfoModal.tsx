import { ProfileIndoModalTypes } from '@/types';
import { Button, Checkbox, Label, Modal, Select, TextInput } from 'flowbite-react';

const EditProfileInfoModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header className="mb-2">
                <h3 className="text-xl font-medium text-gray-900 ml-4 mt-2">Редактировать данные</h3>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value="Имя" />
                        </div>
                        <TextInput id="firstName" type="text" placeholder={userData.details.firstName} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Фамилия" />
                        </div>
                        <TextInput id="lastName" type="text" placeholder={userData.details.lastName} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phoneNumber" value="Номер телефона" />
                        </div>
                        <TextInput id="phoneNumber" type="text" placeholder={userData.details.phoneNumber} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="E-mail" />
                        </div>
                        <TextInput id="email" type="email" placeholder={userData.details.email} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="location" value="Расположение" />
                        </div>
                        <TextInput id="location" type="text" placeholder={userData.details.location} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="genders" value="Пол" />
                        </div>
                        <Select
                            id="genders"
                            defaultValue={userData.details.gender !== '' ? userData.details.gender : ''}
                        >
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                            <option value="Другое">Другое</option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Button>Сохранить</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileInfoModal;
