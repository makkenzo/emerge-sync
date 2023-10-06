'use client';

import { Sidenav } from '@/components';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const dashboard = () => {
    // const token = useSelector((state: RootState) => state.auth.token);

    // const userId = useSelector((state: RootState) => state.auth.userId);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/auth');
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Sidenav />
            <div className="p-4 xl:ml-80"></div>
        </div>
    );
};

export default dashboard;
