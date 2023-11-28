import instance from '@/lib/api';
import { RoleModel } from '@/types';
import { Button } from '@material-tailwind/react';
import { Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

enum RuleStatus {
    Hiding = 0,
    Visible = 1,
    Unknown = 2,
    AllHiding = 3,
    AllVisible = 4,
}

interface RuleDetailsProps {
    role: RoleModel;
    fileId: string | string[] | undefined;
    userId: string | null;
}

interface Rule {
    [key: string]: any;
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ role, fileId }) => {
    const [rules, setRules] = useState<Rule[]>(role.rule);
    const [keys, setKeys] = useState<string[]>();
    const [canModify, setCanModify] = useState<boolean>(role.can_modify ? role.can_modify : false);
    const isAllStatus = (status: RuleStatus) => {
        return status === RuleStatus.AllHiding || status === RuleStatus.AllVisible;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const fetchData = async () => {
            try {
                await instance.get(`/workflow_item/getKeys/${fileId}/`, { headers }).then((res) => {
                    const { _id, workflow_id, ...cleanedData } = res.data;

                    setKeys(Object.keys(cleanedData));
                });
            } catch (ex) {
                console.error(ex);
            }
        };

        fetchData();
    }, []);

    const saveRules = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const dataToSave = {
            name: role.name,
            rule: rules.map((rule) => ({
                id: 'string',
                fields: {
                    ...rule.fields,
                },
                status: rule.status !== undefined ? rule.status : RuleStatus.Hiding,
                is_delete: false,
            })),
            user_id: role.user_id,
            is_delete: false,
            workflow_id: role.workflow_id,
            creater_id: role.creater_id,
            can_modify: canModify,
        };

        const reponse = await instance.put('/role/', dataToSave, { headers });
    };

    const addRule = () => {
        const newRule = {
            status: RuleStatus.Hiding,
            fields: {},
        };
        setRules([...rules, newRule]);
    };

    const handleKeyChange = (ruleIndex: number, key: string) => {
        const updatedRules = [...rules];
        updatedRules[ruleIndex].fields = { [key]: '' };
        setRules(updatedRules);
    };

    const handleFieldChange = (ruleIndex: number, key: string, value: string | boolean) => {
        const updatedRules = [...rules];

        if (!updatedRules[ruleIndex].fields) {
            updatedRules[ruleIndex].fields = {};
        }

        if (typeof value === 'string') {
            updatedRules[ruleIndex].fields[key] = value;
        } else {
            if (value){
            updatedRules[ruleIndex].fields[key] = value;
            }else{
                delete updatedRules[ruleIndex].fields[key];

            }
        }

        setRules(updatedRules);
    };

    const handleStatusChange = (ruleIndex: number, newStatus: RuleStatus) => {
        const updatedRules = [...rules];
        updatedRules[ruleIndex].status = newStatus;
        setRules(updatedRules);
    };

    return (
        <div className="p-4 w-1/3">
            <h2 className="text-xl font-bold mb-4">Детали условий:</h2>
            <p>Условия для роли: {role.name}</p>
            <div className="flex space-x-2">
                <Button
                    onClick={addRule}
                    size="sm"
                    className="mt-2 bg-[#607d8b] text-white rounded-md hover:bg-[#495f6a] transition duration-300"
                >
                    Добавить условие
                </Button>
                <Button
                    size="sm"
                    onClick={saveRules}
                    className="mt-2 bg-[#4caf50] text-white rounded-md hover:bg-[#388e3c] transition duration-300"
                >
                    Сохранить изменения
                </Button>
            </div>
            {rules && rules.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                        id="can_modify_checkbox"
                        checked={canModify}
                        onChange={() => setCanModify(!canModify)}
                        className="text-[#607d8b] focus:border-gray-500 focus:ring-gray-500"
                    />
                    <Label htmlFor="can_modify_checkbox">Документ доступен для редактирования</Label>
                </div>
            )}
            {rules.map((rule, index) => (
                <div key={index} className="mt-4 space-y-4 border border-dashed border-gray-700 p-4 rounded-lg">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Статус" />
                        </div>
                        <Select
                            id="status"
                            value={rule.status}
                            onChange={(e) => handleStatusChange(index, Number(e.target.value))}
                            defaultValue={RuleStatus.Hiding}
                        >
                            <option value={RuleStatus.Hiding}>Невидимо</option>
                            <option value={RuleStatus.Visible}>Видимо</option>
                            <option value={RuleStatus.AllHiding}>Скрыты все</option>
                            <option value={RuleStatus.AllVisible}>Видимы все</option>
                        </Select>
                    </div>

                    <div className="mb-2 block">
                        <Label htmlFor={`field_${index}`} value="Поля" />
                    </div>
                    <div className="mt-2">
                        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                            <p className="text-md italic font-medium leading-relaxed text-gray-900 dark:text-white">
                                Оставьте значение поля пустым, если оно не включено в правило.
                            </p>
                        </blockquote>
                        {isAllStatus(rule.status) ? (
                            // Render checkboxes
                            <div>
                                {keys?.map((key, inx) => (
                                    <div key={inx} className="flex items-center mt-2 space-x-2">
                                        <Select
                                            id={`key_select_${index}`}
                                            value={key}
                                            onChange={(e) => handleKeyChange(index, e.target.value)}
                                            disabled
                                            className="w-1/3"
                                        >
                                            <option value={key}>{key}</option>
                                        </Select>
                                        <Checkbox
                                            id={`checkbox_${index}_${inx}`}
                                            checked={Boolean(rules[index]?.fields && rules[index]?.fields[key])}
                                            onChange={(e) => handleFieldChange(index, key, e.target.checked)}
                                            className=""
                                        />
                                        <Label htmlFor={`checkbox_${index}_${inx}`}>Выбрать поле</Label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Render text inputs
                            <div>
                                {keys?.map((key, inx) => (
                                    <div key={inx} className="flex items-center mt-2 space-x-2">
                                        <Select
                                            id={`key_select_${index}`}
                                            value={key}
                                            onChange={(e) => handleKeyChange(index, e.target.value)}
                                            disabled
                                            className="w-1/3"
                                        >
                                            <option value={key}>{key}</option>
                                        </Select>
                                        <TextInput
                                            id={`field_${index}`}
                                            value={(rules[index]?.fields && rules[index]?.fields[key]) || ''}
                                            onChange={(e) => handleFieldChange(index, key, e.target.value)}
                                            placeholder="Имя поля"
                                            className="w-2/3"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RuleDetails;
