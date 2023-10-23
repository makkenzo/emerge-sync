'use client';

import { Sidenav } from '@/components';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import * as XLSX from 'xlsx';
const license =
    'MjEzYzA4NDg5NmMwYjViMmFiM2RhMjlmMTdjMmUxMTU1MGE3YmE0ZmFhNGFmMzVjNDg2ZDE4MDcyNzNjODA5YzNkNzZlYTczMTkxYTY5YTBkMGNlYmJhYmIxYzU0NDE3M2ViZWIyZWMxZjliNGI4MDNkODFmOGFlNTliMWZhMGYsZXlKdVlXMWxJam9pU25Od2NtVmhaSE5vWldWMElpd2laR0YwWlNJNk1UWTVPREUwTVRJME5pd2laRzl0WVdsdUlqcGJJbXB6Y0hKbFlXUnphR1ZsZEM1amIyMGlMQ0pqYjJSbGMyRnVaR0p2ZUM1cGJ5SXNJbXB6YUdWc2JDNXVaWFFpTENKamMySXVZWEJ3SWl3aWQyVmlJaXdpYkc5allXeG9iM04wSWwwc0luQnNZVzRpT2lJek5DSXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NJc0luWXhNQ0lzSW1Ob1lYSjBjeUlzSW1admNtMXpJaXdpWm05eWJYVnNZU0lzSW5CaGNuTmxjaUlzSW5KbGJtUmxjaUlzSW1OdmJXMWxiblJ6SWl3aWFXMXdiM0owSWl3aVltRnlJaXdpZG1Gc2FXUmhkR2x2Ym5NaUxDSnpaV0Z5WTJnaUxDSndjbWx1ZENJc0luTm9aV1YwY3lKZExDSmtaVzF2SWpwMGNuVmxmUT09';

const FilePage = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

    const [data, setData] = useState<any[]>([]);
    const [document, setDocument] = useState('');

    const spreadsheet = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://localhost:5000/api/v1/documents/get-document/${fileId}`).then((response) => {
                    setDocument(response.data.file);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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
                    <Card className="mt-2">
                        <CardHeader variant="filled" color="blue-gray" className="mb-8 p-6">
                            {document ? document : 'Документ'}
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2">
                            {data.length > 0 && (
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {Object.keys(data[0]).map((key) => (
                                                <th
                                                    key={key}
                                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="font-bold uppercase text-blue-gray-400"
                                                    >
                                                        {key}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="border-b border-blue-gray-100">
                                                {Object.values(row).map((value, colIndex) => (
                                                    <td key={colIndex} className="py-3 px-5 text-left">
                                                        {String(value)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </CardBody>
                    </Card>
                    <input type="file" accept=".xlsx, .xls" onChange={importExcel} />
                </div>
            </div>
        </>
    );
};

export default FilePage;
