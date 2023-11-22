// components/RuleDetails.tsx

import instance from '@/lib/api';
import { Button, Input } from '@material-tailwind/react';
import { Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

// Определение enum для статусов
enum RuleStatus {
    Hiding = 0,
    Visible = 1,
    Unknown = 2,
}

interface RuleDetailsProps {
    role: string;
    fileId: string | string[] | undefined;
}

interface Rule {
    status: RuleStatus;
    fields: Record<string, string>;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ role, fileId }) => {
    const [rules, setRules] = useState<Rule[]>([]);

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
        const requestData = {
            name: role,
            rule: rules.map((rule) => ({
                status: rule.status,
                fields: rule.fields,
                is_delete: false,
            })),
            user_id: 'string',
            is_delete: false,
            workflow_id: fileId,
        };

        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await instance.put(`/role/`, requestData, { headers });
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
                            <Label htmlFor="field" value="Field" />
                        </div>
                        <TextInput
                            id="field"
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
