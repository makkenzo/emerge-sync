'use client';

import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const dashboard = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.token);

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth');
        }
    }, []);

    // const userId = useSelector((state: RootState) => state.auth.userId);
    // console.log(userId);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default dashboard;
