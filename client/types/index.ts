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

export interface Fields {
    [key: string]: string;
}

export interface MyModel {
    status: number;
    fields: Fields;
    is_delete: boolean;
}

interface Field {
    [key: string]: any;
}

export interface RoleModel {
    _id: string;
    name: string;
    rule: Rule[];
    user_id: string;
    is_delete: boolean;
    workflow_id: string;
    creater_id: string;
    can_modify: boolean;
}

export interface Workflow {
    _id: string;
    name: string;
    create_at: string;
    last_modify: string;
    user_id: string;
}

export interface UserData {
    _id: string;
    first_name: string;
    last_name: string;
    user_id: string;
    phone: string;
    email: string;
}

export interface Rule {
    status: number;
    fields: Record<string, string>;
}
