import { useDispatch, useSelector } from 'react-redux';
import { setIsEmailValid, setIsPhoneValid, setIsURLValid } from '@/redux/slices/validationSlice';
import { RootState } from '@/redux/store';
import { ProfileIndoModalTypes } from '@/types';
import { Typography } from '@material-tailwind/react';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import instance from '@/lib/api';

const EditProfileInfoModal = ({ isModalOpen, closeModal, userData }: ProfileIndoModalTypes) => {
    const isEmailValid = useSelector((state: RootState) => state.validation.isEmailValid);
    const isPhoneValid = useSelector((state: RootState) => state.validation.isPhoneValid);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        email: userData.email,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSaveChanges = async () => {
        if (!checkIsEmailValid(formData.email)) {
            return;
        }
        try {
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await instance.put(`/user`, formData, { headers });

            if (response.status === 200) {
                closeModal();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const checkIsEmailValid = (email: string) => {
        const state = validator.isEmail(email);
        dispatch(setIsEmailValid(state));

        return state;
    };

    const checkIsPhoneValid = (phone: string) => {
        const state = validator.isMobilePhone(phone);
        dispatch(setIsPhoneValid(state));

        return state;
    };

    return (
        <Modal size="xl" show={isModalOpen} popup onClose={closeModal}>
            <Modal.Header className="mb-2">
                <h3 className="text-xl font-medium text-gray-900 ml-4 mt-2">Редактировать данные</h3>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <div>
                        {/* <Typography variant="lead" className="mb-2 font-semibold">
                            Данные профиля
                        </Typography> */}
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="first_name" value="Имя" />
                                </div>
                                <TextInput
                                    id="first_name"
                                    type="text"
                                    placeholder={userData.first_name}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="last_name" value="Фамилия" />
                                </div>
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    placeholder={userData.last_name}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Номер телефона" />
                                    {/* <Label htmlFor="phone" value="*" className="ml-1 text-red-700" /> */}
                                </div>
                                <TextInput
                                    color={isPhoneValid ? 'gray' : 'failure'}
                                    id="phone"
                                    type="text"
                                    placeholder={userData.phone}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="E-mail" />
                                    <Label htmlFor="email" value="*" className="ml-1 text-red-700" />
                                </div>
                                <TextInput
                                    color={isEmailValid ? 'gray' : 'failure'}
                                    id="email"
                                    type="email"
                                    placeholder={userData.email}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="relative">
                        <Typography variant="lead" className="mb-2 font-semibold">
                            Социальные сети
                        </Typography>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="LinkedIn" value="LinkedIn" />
                                </div>
                                <TextInput
                                    color={!linkedInError ? 'gray' : 'failure'}
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
                                    color={!instagramError ? 'gray' : 'failure'}
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
                                    color={!telegramError ? 'gray' : 'failure'}
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
                                    color={!xError ? 'gray' : 'failure'}
                                    id="X"
                                    type="url"
                                    placeholder={userData.details.socialMedia.X}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="w-full mt-4">
                    <Button className="w-full" onClick={handleSaveChanges}>
                        Сохранить
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileInfoModal;
