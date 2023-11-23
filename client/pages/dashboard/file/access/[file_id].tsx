import { RoleDetails, RolesList, RuleDetails, Sidenav } from '@/components';
import AddRoleModal from '@/components/AddRoleModal';
import { Fields, MyModel } from '@/types';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Rule {
    status: number;
    fields: Record<string, string>;
}

const FileSettings = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

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
        console.log(rules);
    }, [rules]);

    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [editRole, setEditRole] = useState<boolean>(false);
    return (
        <>
            <Head>
                <title>ExcelStockList | File access</title>
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
                                />

                                {editRole && selectedRole && <RuleDetails role={selectedRole} fileId={fileId} />}
                            </div>
                            {/* <Button color="blue" onClick={addRule}>
                                Добавить правило
                            </Button>
                            <div className="w-[1300px] h-[795px] overflow-x-auto flex flex-col mx-4">
                                {rules.map((rule, index) => (
                                    <div key={index} className="mt-4">
                                        <div>
                                            <label>Status:</label>
                                            <input
                                                type="number"
                                                value={rule.status}
                                                onChange={(e) => updateRuleField(index, 'status', e.target.value)}
                                            />
                                        </div>
                                        <h1>Fields:</h1>
                                        <div>
                                            <input
                                                type="text"
                                                // value={rule.fields}
                                                onChange={(e) =>
                                                    updateRuleField(index, 'fields.field   ', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FileSettings;
