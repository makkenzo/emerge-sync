'use client';

import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const dashboard = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/auth');
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default dashboard;
