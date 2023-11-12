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
