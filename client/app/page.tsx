'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        redirect('/auth');
    }, []);
    return <div></div>;
};

export default Page;
