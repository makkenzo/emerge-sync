import { ProfileIndoModalTypes } from '@/types';
import axios from 'axios';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

const EditProfileInfoModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const [formData, setFormData] = useState({
        details: {
            firstName: userData.details.firstName,
            lastName: userData.details.lastName,
            phoneNumber: userData.details.phoneNumber,
            email: userData.details.email,
            location: userData.details.location,
            gender: userData.details.gender,
            socialMedia: {
                LinkedIn: userData.details.socialMedia.LinkedIn,
                Instagram: userData.details.socialMedia.Instagram,
                Telegram: userData.details.socialMedia.Telegram,
                X: userData.details.socialMedia.X,
            },
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            details: {
                ...formData.details,
                [id]: value,
            },
        });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGender = e.target.value;
        setFormData({
            ...formData,
            details: {
                ...formData.details,
                gender: selectedGender,
            },
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/users/${userData._id}`, formData);

            if (response.status === 200) {
                closeModal();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

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
                        <TextInput
                            id="firstName"
                            type="text"
                            placeholder={userData.details.firstName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Фамилия" />
                        </div>
                        <TextInput
                            id="lastName"
                            type="text"
                            placeholder={userData.details.lastName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phoneNumber" value="Номер телефона" />
                        </div>
                        <TextInput
                            id="phoneNumber"
                            type="text"
                            placeholder={userData.details.phoneNumber}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="E-mail" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder={userData.details.email}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="location" value="Расположение" />
                        </div>
                        <TextInput
                            id="location"
                            type="text"
                            placeholder={userData.details.location}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="genders" value="Пол" />
                        </div>
                        <Select
                            id="genders"
                            defaultValue={userData.details.gender !== '' ? userData.details.gender : ''}
                            value={formData.details.gender}
                            onChange={(e) => handleGenderChange(e)}
                        >
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                            <option value="Другое">Другое</option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Button onClick={handleSaveChanges}>Сохранить</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileInfoModal;
