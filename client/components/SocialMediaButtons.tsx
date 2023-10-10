import { UserData } from '@/types';
import Link from 'next/link';
import React from 'react';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { TbBrandTelegram } from 'react-icons/tb';

const SocialMediaButtons: React.FC<{ userData: UserData }> = ({ userData }) => {
    return (
        <div className="flex flex-col items-start justify-center space-y-3">
            <button
                className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded${
                    userData.details.socialMedia.LinkedIn === ''
                        ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                        : 'bg-[#007ab9] hover:shadow-2xl transition-shadow ease-in-out'
                }`}
            >
                <AiFillLinkedin size={40} />
                <span>LinkedIn</span>
            </button>
            <button
                className={` text-white px-4 py-2 font-semibold text-2xl  inline-flex items-center space-x-2 rounded${
                    userData.details.socialMedia.Instagram === ''
                        ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                        : 'bg-gradient-to-r from-[#ffd600] via-[#ff0069] to-[#7638fa] hover:shadow-2xl transition-shadow ease-in-out'
                }`}
            >
                <AiFillInstagram size={40} />
                <span>Instagram</span>
            </button>
            <button
                className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded${
                    userData.details.socialMedia.Telegram === ''
                        ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                        : 'bg-[#26a4e3] hover:shadow-2xl transition-shadow ease-in-out'
                }`}
            >
                <TbBrandTelegram size={40} />
                <span>Telegram</span>
            </button>
            <Link
                href={userData.details.socialMedia.X}
                target="_blank"
                className={`px-4 py-2 font-semibold text-2xl text-white inline-flex items-center space-x-2 rounded ${
                    userData?.details.socialMedia.X === ''
                        ? 'text-gray-400 bg-blue-gray-700 cursor-default'
                        : 'bg-black hover:shadow-2xl transition-shadow ease-in-out'
                }`}
            >
                <FaXTwitter size={40} />
                <span>Twitter</span>
            </Link>
        </div>
    );
};

export default SocialMediaButtons;
