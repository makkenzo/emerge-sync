import axios from 'axios'; // Импортируем axios

const instance = axios;
import { RoleModel } from '@/types';
import { Button, List, ListItem } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { RoleDetails } from '.';
import AddRoleModal from './AddRoleModal';

interface RolesListProps {
    selectedRole: RoleModel | null;
    setSelectedRole: React.Dispatch<React.SetStateAction<RoleModel | null>>;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | null;
}

const RolesList: React.FC<RolesListProps> = ({ selectedRole, setSelectedRole, setEditRole, userId, setUserId }) => {
    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
    const [selectedRoleId, setSelectedRoleId] = useState<string>('');
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [rules, setRules] = useState({
        name: 'papa',
        lastname: 'johns',
    });

    const router = useRouter();
    const fileId = router.query.file_id;

    const handleAddRole = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const fetchData = async () => {
            try {
                const response = await instance.get(`https://excelsync.5dev.kz/role/${fileId}`, { headers });
                const rolesData: RoleModel[] = response.data;

                setRoles(rolesData);
                rolesData;
            } catch (ex) {
                console.error(ex);
            }
        };

        if (fileId) {
            fetchData();
        }
    }, [fileId]);

    const handleListItemClick = (role: RoleModel) => {
        setSelectedRole(role);
        setSelectedUser(role.user_id);
        setSelectedRoleId(role._id);
        setUserId(role.creater_id);
    };

    return (
        <>
            <div className="p-4 w-1/3">
                <div className="flex justify-between px-4">
                    <h2 className="text-xl font-bold mb-4">Созданные роли</h2>
                    <Button
                        size="sm"
                        color="blue"
                        className="w-[30px] h-[30px] p-0 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                        onClick={handleAddRole}
                    >
                        <FaPlus size={20} className="inline-block" />
                    </Button>
                </div>
                {roles && roles.length > 0 ? (
                    <List className="shadow-lg rounded-xl">
                        {roles.map((role) => (
                            <ListItem key={role.name} onClick={() => handleListItemClick(role)}>
                                {role.name}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <h1>Ролей пока нет..</h1>
                )}
            </div>
            {selectedRole && (
                <RoleDetails
                    role={selectedRole}
                    user={selectedUser || ''}
                    rules={rules}
                    setEditRole={setEditRole}
                    roleId={selectedRoleId}
                    setUserId={setUserId}
                />
            )}
            {fileId && isModalOpen && (
                <AddRoleModal isModalOpen={isModalOpen} closeModal={closeModal} fileId={fileId} />
            )}
        </>
    );
};

export default RolesList;
