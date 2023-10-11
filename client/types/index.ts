export type UserData = {
    username: string;
    role: string;
    details: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        location: string;
        profilePic: string;
        gender: string;
        socialMedia: {
            LinkedIn: string;
            Instagram: string;
            Telegram: string;
            X: string;
        };
    };
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
