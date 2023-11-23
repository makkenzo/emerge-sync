export type UserData = {
    _id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
};

export type SocialMediaKey = 'LinkedIn' | 'Instagram' | 'Telegram' | 'X';

export type SocialMediaData = {
    [key in SocialMediaKey]: string;
};

export type ProfileIndoModalTypes = {
    isModalOpen: boolean;
    closeModal: () => void;
    userData: UserData;
};

export type RoleModalTypes = {
    isModalOpen: boolean;
    closeModal: () => void;
    fileId: string | string[];
};

export type XlsxDocument = {
    _id: string;
    name: string;
    create_at: string;
    last_modify: string;
    user_id: string;
};

export type LogsData = {
    _id: string;
    workflow_id: string;
    user_id: string;
    op: string;
    change: string;
};

// Интерфейс для структуры полей
export interface Fields {
    [key: string]: string;
}

// Интерфейс для модели
export interface MyModel {
    status: number;
    fields: Fields;
    is_delete: boolean;
}

interface Field {
    // Ваши уникальные ключи и значения
    [key: string]: any;
}

interface Rule {
    id: string;
    status: number;
    fields: Field;
    is_delete: boolean;
}

export interface RoleModel {
    _id: string;
    name: string;
    rule: Rule[];
    user_id: string;
    is_delete: boolean;
    workflow_id: string;
    creater_id: string;
}

export interface Workflow {
    _id: string;
    name: string;
    create_at: string;
    last_modify: string;
    user_id: string;
}
