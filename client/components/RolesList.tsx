// components/RolesList.tsx

import instance from '@/lib/api';
import { RoleModel } from '@/types';
import { Button, List, ListItem } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { RoleDetails } from '.';
import AddRoleModal from './AddRoleModal';

interface RolesListProps {
    selectedRole: string | null;
    setSelectedRole: React.Dispatch<React.SetStateAction<string | null>>;
    setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesList: React.FC<RolesListProps> = ({ selectedRole, setSelectedRole, setEditRole }) => {
    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
    const [selectedRoleId, setSelectedRoleId] = useState<string>();
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [users, setUsers] = useState<string[]>();
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
            const response = await instance.get(`/role/${fileId}`, { headers });
            const rolesData: RoleModel[] = response.data;

            setRoles(rolesData);
        };

        if (fileId) {
            fetchData();
        }
    }, [fileId]);

    const handleListItemClick = (role: RoleModel) => {
        setSelectedRole(role.name);
        setSelectedUser(role.user_id);
        setSelectedRoleId(role._id);
    };

    return (
        <>
            <div className="p-4 w-1/3">
                <div className="flex justify-between px-4">
                    <h2 className="text-xl font-bold mb-4">Доступные роли</h2>
                    <Button
                        size="sm"
                        color="blue"
                        className="w-[30px] h-[30px] p-0 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                        onClick={handleAddRole}
                    >
                        <FaPlus size={20} className="inline-block" />
                    </Button>
                </div>
                {roles && (
                    <List className="shadow-lg rounded-xl">
                        {roles.map((role) => (
                            <ListItem key={role.name} onClick={() => handleListItemClick(role)}>
                                {role.name}
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
            {selectedRole && (
                <RoleDetails
                    role={selectedRole}
                    user={selectedUser || ''}
                    rules={rules}
                    setEditRole={setEditRole}
                    roleId={selectedRoleId}
                />
            )}
            {fileId && <AddRoleModal isModalOpen={isModalOpen} closeModal={closeModal} fileId={fileId} />}
        </>
    );
};

export default RolesList;
