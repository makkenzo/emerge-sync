import { Sidenav } from '@/components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import * as XLSX from 'xlsx';

const FilePage = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

    const [data, setData] = useState<any[]>([]);

    const importExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (event) => {
                const data = event.target?.result as string;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                setData(parsedData);
            };
        }
    };

    return (
        <>
            <Head>
                <title>EmergeSync | File overview</title>
            </Head>

            <div className="min-h-screen bg-slate-200 flex">
                <Sidenav />
                <div className="container mx-auto pt-8">
                    <input type="file" accept=".xlsx, .xls" onChange={importExcel} />
                    {data.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex}>{String(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default FilePage;
