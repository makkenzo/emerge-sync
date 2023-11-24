// components/RuleDetails.tsx

import instance from '@/lib/api';
import { RoleModel } from '@/types';
import { Button } from '@material-tailwind/react';
import { Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { object, string } from 'zod';
// Определение enum для статусов
enum RuleStatus {
    Hiding = 0,
    Visible = 1,
    Unknown = 2,
}

interface ExistingRule {
    _id: string;
    status: RuleStatus;
    fields: Record<string, string>;
}

interface RuleDetailsProps {
    role: RoleModel;
    fileId: string | string[] | undefined;
    existingRules?: ExistingRule[];
    userId: string | null;
}

interface Rule {

    status: RuleStatus;
    fields: Record<string, string>;
    id: string;
}
interface SaveKeyValue {
    index: number;
    key: string;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ role, userId, fileId, existingRules = [] }) => {
    const [rules, setRules] = useState<Rule[]>([]);
    const [save_key, set_save_key] = useState<SaveKeyValue>({ index: -1, key: "" });
    const [documentformat, setDocument] = useState<Record<string, string> | undefined>();

    // Инициализируем состояние rules с существующими правилами
    useEffect(() => {
        if (role.rule.length > 0) {
            //alert(role.rule[0])

            setRules(
                role.rule.map((rule) => ({
                    id: rule.id,
                    status: rule.status,
                    fields: { ...rule.fields },
                }))
            );
        }

    }, [role.rule]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const fetchData = async () => {
            try{
            await instance.get(`/workflow_item/getKeys/${fileId}/`, { headers }).then((res) => {
                const { _id, workflow_id, ...cleanedData } = res.data;
                setDocument(cleanedData);

            });
        }
        catch(ex){
            console.error(ex)
        }
        };

        fetchData();
    }, []);

    const addRule = () => {
        const newRule: Rule = {
            id: "",
            status: RuleStatus.Hiding,
            fields: {},
        };
        setRules([...rules, newRule]);
    };

    const updateRuleField = (index: number, value: string) => {
        if (save_key.index < 0 || save_key.key === ""
            || save_key.key === null
        ) { return }
        let field = save_key.key
        const updatedRules = [...rules];
        try {
            if (updatedRules[index].fields[field] === null) {
                throw new Error("Field cannot be null");
            }
        } catch {
            alert(123)
            return
        }

        updatedRules[index].fields[field] = value;
        setRules(updatedRules);
    };

    const handleStatusChange = (index: number, selectedStatus: RuleStatus) => {
        const updatedRules = [...rules];
        updatedRules[index].status = selectedStatus;
        setRules(updatedRules);
    };

    const handleUpdateRules = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const requestData = {
            name: role.name,
            rule: rules.map((rule) => ({
                id: rule.id,
                status: rule.status,
                fields: rule.fields,
                is_delete: false,
            })),
            user_id: role.user_id,
            is_delete: false,
            workflow_id: fileId,
        };
        console.error(requestData);
        try {
            const response = await instance.put(`/role/`, requestData, { headers });
        }
        catch (ex) {
            console.log(ex)
        }
    };

    const addField = (ruleIndex: number) => {
        const newKey = `field_${Object.keys(rules[ruleIndex].fields).length + 1}`;

        setRules(prevRules => {
            const updatedRules = [...prevRules];
            updatedRules[ruleIndex].fields[newKey] = '';
            return updatedRules;
        });
    };

    const handleSelectChange = (index: number, selectedKey: string) => {
        // const updatedRules = [...rules];
        // const selectedField = Object.keys(updatedRules[index].fields)[0];
        // updatedRules[index].fields[selectedKey] = updatedRules[index].fields[selectedField];
        // delete updatedRules[index].fields[selectedField];
        // setRules(updatedRules);
        set_save_key({ index: index, key: selectedKey })
    };
    return (
        <div className="p-4 w-1/3">
            <h2 className="text-xl font-bold mb-4">Детали условий:</h2>
            <p>Условия для роли: {role.name}</p>
            <Button
                onClick={addRule}
                size="sm"
                className="mt-2 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
            >
                Добавить условие
            </Button>
            {rules.map((rule, index) => (
                <div key={index} className="mt-4 space-y-4 border border-dashed border-gray-700 p-4 rounded-lg">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Status" />
                        </div>
                        <Select
                            id="status"
                            value={rule.status}
                            onChange={(e) => handleStatusChange(index, Number(e.target.value))}
                        >
                            <option value={RuleStatus.Hiding}>Hiding</option>
                            <option value={RuleStatus.Visible}>Visible</option>
                            {/* <option value={RuleStatus.Unknown}>Unknown</option> */}
                        </Select>
                    </div>

                    <div className="mb-2 block">
                        <Label htmlFor={`field_${index}`} value="Fields" />
                    </div>
                    <div className="mt-2">
                        {Object.entries(rule.fields).map(([key, value], inx) => (
                            <div key={inx} className="flex items-center mt-2">
                                <Select
                                    id="key_select"

                                    onChange={(e) => handleSelectChange(index, String(e.target.value))}
                                >
                                    {documentformat && Object.keys(documentformat).map((key) => (
                                        <option key={key} value={documentformat[key]}>{key}</option>
                                    ))}
                                    {/* <option value={key}>{key}</option> */}
                                </Select>
                                <TextInput
                                    id={`field_${index}`}
                                    value={value}
                                    onChange={(e) => updateRuleField(index, e.target.value)}
                                    placeholder="Field name"
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        size="sm"
                        color="blue"
                        className="w-[30px] h-[30px] p-0 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                        onClick={() => addField(index)}
                    >
                        <FaPlus size={20} className="inline-block" />
                    </Button>
                </div>

            ))}
            <Button
                onClick={handleUpdateRules}
                size="sm"
                className="mt-4 bg-[#4caf50] text-white rounded-md hover:bg-[#388e3c] transition duration-300"
            >
                Сохранить условие
            </Button>
        </div>
    );
};

export default RuleDetails;
