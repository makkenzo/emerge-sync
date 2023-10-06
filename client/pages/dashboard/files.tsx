import { Sidenav } from '@/components';
import React from 'react';

const files = () => {
    return (
        <div className="min-h-screen bg-slate-200 flex">
            <Sidenav />
            {/* ...files table here */}
            <div className="container mx-auto py-8">
                <h1>FILES</h1>
            </div>
        </div>
    );
};

export default files;
