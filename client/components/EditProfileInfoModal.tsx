import { ProfileIndoModalTypes } from '@/types';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import validator from 'validator';

const EditProfileInfoModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

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

                socialMedia: {
                    ...formData.details.socialMedia,
                    [id]: value,
                },
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
        if (!checkIsEmailValid(formData.details.email) || !checkIsPhoneValid(formData.details.phoneNumber)) {
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/users/${userData._id}`, formData);

            if (response.status === 200) {
                closeModal();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const checkIsEmailValid = (email: string) => {
        const state = validator.isEmail(email);
        setIsEmailValid(state);

        return state;
    };

    const checkIsPhoneValid = (phone: string) => {
        const state = validator.isMobilePhone(phone);
        setIsPhoneValid(state);

        return state;
    };

    return (
        <Modal show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header className="mb-2">
                <h3 className="text-xl font-medium text-gray-900 ml-4 mt-2">Редактировать данные</h3>
            </Modal.Header>
            <Modal.Body>
                <Typography variant="lead" className="mb-2 font-semibold">
                    Данные профиля
                </Typography>
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
                            color={isPhoneValid ? 'gray' : 'failure'}
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
                            color={isEmailValid ? 'gray' : 'failure'}
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
                    <Typography variant="lead" className="mb-2 font-semibold">
                        Социальные сети
                    </Typography>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="LinkedIn" value="LinkedIn" />
                        </div>
                        <TextInput
                            id="LinkedIn"
                            type="url"
                            placeholder={userData.details.socialMedia.LinkedIn}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Instagram" value="Instagram" />
                        </div>
                        <TextInput
                            id="Instagram"
                            type="url"
                            placeholder={userData.details.socialMedia.Instagram}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Telegram" value="Telegram" />
                        </div>
                        <TextInput
                            id="Telegram"
                            type="url"
                            placeholder={userData.details.socialMedia.Telegram}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="X" value="X" />
                        </div>
                        <TextInput
                            id="X"
                            type="url"
                            placeholder={userData.details.socialMedia.X}
                            onChange={(e) => handleInputChange(e)}
                        />
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
