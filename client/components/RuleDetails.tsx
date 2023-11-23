// components/RuleDetails.tsx

import instance from '@/lib/api';
import { Button } from '@material-tailwind/react';
import { Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

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
    role: string;
    fileId: string | string[] | undefined;
    existingRules?: ExistingRule[];
    userId: string | null;
}

interface Rule {
    status: RuleStatus;
    fields: Record<string, string>;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ role, userId, fileId, existingRules = [] }) => {
    const [rules, setRules] = useState<Rule[]>([]);

    // Инициализируем состояние rules с существующими правилами
    useEffect(() => {
        if (existingRules.length > 0) {
            setRules(
                existingRules.map((rule) => ({
                    status: rule.status,
                    fields: { ...rule.fields },
                }))
            );
        }
    }, [existingRules]);

    const addRule = () => {
        const newRule: Rule = {
            status: RuleStatus.Hiding,
            fields: {},
        };
        setRules([...rules, newRule]);
    };

    const updateRuleField = (index: number, field: string, value: string) => {
        const updatedRules = [...rules];
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
            name: role,
            rule: rules.map((rule) => ({
                status: rule.status,
                fields: rule.fields,
                is_delete: false,
            })),
            user_id: userId,
            is_delete: false,
            workflow_id: fileId,
        };

        // const response = await instance.put(`/role/`, requestData, { headers });
    };

    return (
        <div className="p-4 w-1/3">
            <h2 className="text-xl font-bold mb-4">Детали правил:</h2>
            <p>Правила для роли: {role}</p>
            <Button
                onClick={addRule}
                size="sm"
                className="mt-2 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
            >
                Добавить правило
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
                            <option value={RuleStatus.Unknown}>Unknown</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor={`field_${index}`} value="Fields" />
                        </div>
                        <TextInput
                            id={`field_${index}`}
                            value={rule.fields.field}
                            onChange={(e) => updateRuleField(index, 'field', e.target.value)}
                            placeholder="Field name"
                        />
                    </div>
                </div>
            ))}
            <Button
                onClick={handleUpdateRules}
                size="sm"
                className="mt-4 bg-[#4caf50] text-white rounded-md hover:bg-[#388e3c] transition duration-300"
            >
                Обновить правила
            </Button>
        </div>
    );
};

export default RuleDetails;
