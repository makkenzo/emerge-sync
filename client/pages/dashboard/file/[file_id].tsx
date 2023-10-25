'use client';

import { Sidenav } from '@/components';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

const FilePage = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

    const [document, setDocument] = useState<{ [key: string]: any }[]>([]);
    const [editCell, setEditCell] = useState({ rowIndex: -1, colIndex: -1 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/documents/get-document/${fileId}`);
                setDocument(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (fileId !== undefined) {
            fetchData();
        }
    }, [setDocument, fileId]);

    const handleSave = async () => {
        try {
            console.log(document);

            await axios.put(`http://localhost:5000/api/v1/documents/update-document/${fileId}`, document);
            window.location.reload();
        } catch (error) {
            console.error('Failed to save document:', error);
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
                        <CardHeader
                            variant="filled"
                            color="blue-gray"
                            className="mb-8 p-6 flex justify-between items-center"
                        >
                            Документ
                            <Button onClick={handleSave}>Сохранить</Button>
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2 gap-4">
                            <div className="w-full h-[810px] overflow-x-auto">
                                {document && document.length > 0 ? (
                                    <table className="w-max table-auto">
                                        <tbody>
                                            <tr className="border border-blue-gray-100">
                                                {Object.keys(document[0]).map((key, index) => (
                                                    <td key={index} className="py-3 px-5 text-left border">
                                                        {key}
                                                    </td>
                                                ))}
                                            </tr>
                                            {document.map((item, rowIndex) => (
                                                <tr key={rowIndex} className="border border-blue-gray-100">
                                                    {Object.values(item).map((value, colIndex) => (
                                                        <td key={colIndex} className="py-3 px-5 text-left border">
                                                            {value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1>No data</h1>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FilePage;
