import { RoleDetails, RolesList, RuleDetails, Sidenav } from '@/components';
import AddRoleModal from '@/components/AddRoleModal';
import { Fields, MyModel, RoleModel, Rule } from '@/types';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const FileSettings = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

    const [selectedRole, setSelectedRole] = useState<RoleModel | null>(null);
    const [editRole, setEditRole] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const [rules, setRules] = useState<Rule[]>([]);
    const addRule = () => {
        const newRule: Rule = {
            status: 0,
            fields: {},
        };
        setRules([...rules, newRule]);
    };

    // Функция для обновления значения поля в правиле
    const updateRuleField = (index: number, field: string, value: string) => {
        const updatedRules = [...rules];
        updatedRules[index].fields[field] = value;
        setRules(updatedRules);
    };
    useEffect(() => {
        rules;
    }, [rules]);

    return (
        <>
            <Head>
                <title>ExcelStockList | Настройки доступа</title>
            </Head>
            <div className="min-h-screen bg-slate-200 flex">
                <Sidenav />
                <div className="container mx-auto pt-8">
                    <Card className="mt-2">
                        <CardHeader
                            variant="filled"
                            color="blue-gray"
                            className="mb-8 p-6 flex justify-between items-center"
                        >
                            Настройки доступа
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2 gap-4">
                            <div className="w-[1300px] h-[795px] overflow-x-auto flex mx-4">
                                <RolesList
                                    selectedRole={selectedRole}
                                    setSelectedRole={setSelectedRole}
                                    setEditRole={setEditRole}
                                    userId={userId}
                                    setUserId={setUserId}
                                />

                                {editRole && selectedRole && (
                                    <RuleDetails role={selectedRole} fileId={fileId} userId={userId} />
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FileSettings;
