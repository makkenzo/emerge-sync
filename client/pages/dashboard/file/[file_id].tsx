'use client';

import { Sidenav } from '@/components';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import * as XLSX from 'xlsx';

const FilePage = () => {
    const router = useRouter();
    const fileId = router.query.file_id;

    const [data, setData] = useState([]);
    const [document, setDocument] = useState([]);

    const spreadsheet = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/documents/get-document/${fileId}`);
                setDocument(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (fileId !== undefined) {
            fetchData();
        }
    }, [setDocument, fileId]);

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
                            Документ
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2">
                            {document && document.length > 0 ? (
                                <table className="table-auto">
                                    <thead>
                                        <tr>
                                            {Object.keys(document[0]).map((header, index) => (
                                                <th key={index} className="px-4 py-2">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {document.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {Object.keys(row).map((key, cellIndex) => (
                                                    <td key={cellIndex} className="border px-4 py-2">
                                                        {row[key]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data available</p>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FilePage;
