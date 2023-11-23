import { SocialMediaKey, UserData } from '@/types';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { TbBrandTelegram } from 'react-icons/tb';

const socialMediaButtonsData: { key: SocialMediaKey; icon: JSX.Element; text: string }[] = [
    {
        key: 'LinkedIn',
        icon: <AiFillLinkedin size={40} />,
        text: 'LinkedIn',
    },
    {
        key: 'Instagram',
        icon: <AiFillInstagram size={40} />,
        text: 'Instagram',
    },
    {
        key: 'Telegram',
        icon: <TbBrandTelegram size={40} />,
        text: 'Telegram',
    },
    {
        key: 'X',
        icon: <FaXTwitter size={40} />,
        text: 'X',
    },
];

const getButtonClass = (socialMediaKey: SocialMediaKey) => {
    switch (socialMediaKey) {
        case 'LinkedIn':
            return 'bg-[#007ab9] hover:shadow-2xl transition-shadow ease-in-out';
        case 'Instagram':
            return 'bg-gradient-to-r from-[#ffd600] via-[#ff0069] to-[#7638fa] hover:shadow-2xl transition-shadow ease-in-out';
        case 'Telegram':
            return 'bg-[#26a4e3] hover:shadow-2xl transition-shadow ease-in-out';
        case 'X':
            return 'bg-black hover:shadow-2xl transition-shadow ease-in-out';
        default:
            return '';
    }
};

const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank');
};

const SocialMediaButtons: React.FC<{ userData: UserData }> = ({ userData }) => {
    return (
        <div className="flex flex-col items-start justify-center space-y-3">
            {socialMediaButtonsData.map((buttonData) => (
                <button
                    key={buttonData.key}
                    className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded ${
                        userData.details.socialMedia[buttonData.key] === ''
                            ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                            : getButtonClass(buttonData.key)
                    }`}
                    onClick={() => {
                        if (userData.details.socialMedia[buttonData.key]) {
                            openLinkInNewTab(userData.details.socialMedia[buttonData.key]);
                        }
                    }}
                >
                    {buttonData.icon}
                    <span>{buttonData.text}</span>
                </button>
            ))}
        </div>
    );
};

export default SocialMediaButtons;
