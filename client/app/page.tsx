'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';

const Page = () => {
    useEffect(() => {
        redirect('/auth');
    }, []);
    return <div></div>;
};

export default Page;
