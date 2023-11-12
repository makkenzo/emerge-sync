'use client';

import { Sidenav } from '@/components';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { PiExport } from 'react-icons/pi';
import { BiSave } from 'react-icons/bi';
import { XlsxDocument } from '@/types';
import {
    ColumnDirective,
    ColumnsDirective,
    Edit,
    EditSettingsModel,
    Filter,
    GridComponent,
    Group,
    Inject,
    Page,
    Sort,
    Toolbar,
    ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { data } from '@/lib/datasource';
import { DataManager, Query, RemoteSaveAdaptor, ReturnOption, WebApiAdaptor } from '@syncfusion/ej2-data';
import { registerLicense } from '@syncfusion/ej2-base';
import instance, { SERVICE_URI } from '@/lib/api';

interface ResponseData {
    Items: any[];
    Count: number;
}

const FilePage = () => {
    registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9eeXRWQmFdVUJ/X0o=');
    const router = useRouter();
    const fileId = router.query.file_id;

    const [xlsxDocument, setDocument] = useState<ResponseData>();

    const [isEditing, setIsEditing] = useState<{ row: number; col: number } | null>(null);
    const [editedData, setEditedData] = useState<string | number>('');
    const [allDocuments, setAllDocuments] = useState<XlsxDocument[]>([]);
    const [filePath, setFilePath] = useState('');

    // const handleDoubleClick = (rowIndex: number, colIndex: number) => {
    //     setIsEditing({ row: rowIndex, col: colIndex });
    //     setEditedData(xlsxDocument[rowIndex][Object.keys(xlsxDocument[0])[colIndex]]);
    // };

    // const handleBlur = () => {
    //     if (isEditing) {
    //         const { row, col } = isEditing;
    //         const updatedDocument = [...xlsxDocument];
    //         updatedDocument[row][Object.keys(xlsxDocument[0])[col]] = editedData;
    //         setDocument(updatedDocument);
    //         setIsEditing(null);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/workflow_item/${fileId}`, { headers });
                setDocument(response.data);

                // const getFilePath = await instance.get('/api/v1/documents/get-documents');
                // setAllDocuments(getFilePath.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (fileId !== undefined) {
            fetchData();
        }
    }, [setDocument, fileId]);

    // useEffect(() => {
    //     console.log(xlsxDocument);
    // }, [xlsxDocument]);

    // useEffect(() => {
    //     if (fileId && allDocuments.length > 0) {
    //         const filteredDocument = allDocuments.find((doc) => doc._id === fileId);

    //         if (filteredDocument) {
    //             setFilePath(filteredDocument.file);
    //         }
    //     }
    // }, [fileId, allDocuments]);

    const handleSave = async () => {
        try {
            await instance.put(`/api/v1/documents/update-document/${fileId}`, xlsxDocument);
            window.location.reload();
        } catch (error) {
            console.error('Failed to save document:', error);
        }
    };

    const handleExport = () => {
        if (filePath !== '') {
            window.open(`${SERVICE_URI}/export-document/${encodeURIComponent(filePath)}`);
        }
    };

    const [token, setToken] = useState('');
    const [headers, setHeaders] = useState({});

    useEffect(() => {
        const tok = localStorage.getItem('token') ?? '';
        const hed = {
            Authorization: `Bearer ${tok}`,
            'Content-Type': 'multipart/form-data',
        };

        setToken(tok);
        setHeaders(hed);
    }, []);

    const data = new DataManager({
        adaptor: new WebApiAdaptor(),
        url: `${SERVICE_URI}/workflow_item/${fileId}`,
        headers: [
            {
                Authorization: `Bearer ${token}`,
            },
        ],
        crossDomain: true,
    });

    const pageSettings: object = { pageSize: 19 };
    const filterSettings: object = { type: 'Excel' };

    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

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
                            <div className="flex space-x-4">
                                <Button onClick={handleExport}>
                                    <PiExport className="mr-1" size={20} />
                                    <p>Экспорт</p>
                                </Button>
                                <Button color="dark" onClick={handleSave}>
                                    <BiSave size={20} className="mr-1" />
                                    <p>Сохранить</p>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2 gap-4">
                            <div className="w-[1300px] h-[795px] overflow-x-auto flex mx-4">
                                {/* {xlsxDocument && xlsxDocument.length > 0 ? (
                                    <>
                                        <table className="w-max table-auto">
                                            <tbody>
                                                <tr className="border border-blue-gray-100">
                                                    {Object.keys(xlsxDocument[0]).map((key, index) => (
                                                        <td key={index} className="py-3 px-5 text-left border">
                                                            {key}
                                                        </td>
                                                    ))}
                                                </tr>
                                                {xlsxDocument.map((item, rowIndex) => (
                                                    <tr key={rowIndex} className="border border-blue-gray-100">
                                                        {Object.values(item).map((value, colIndex) => (
                                                            <td
                                                                key={colIndex}
                                                                className={`py-3 px-5 text-left border ${
                                                                    isEditing &&
                                                                    isEditing.row === rowIndex &&
                                                                    isEditing.col === colIndex
                                                                        ? 'bg-yellow-100'
                                                                        : ''
                                                                }`}
                                                                onDoubleClick={() =>
                                                                    handleDoubleClick(rowIndex, colIndex)
                                                                }
                                                            >
                                                                {isEditing &&
                                                                isEditing.row === rowIndex &&
                                                                isEditing.col === colIndex ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedData}
                                                                        onChange={(e) => setEditedData(e.target.value)}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                ) : (
                                                                    value
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <h1>No data</h1>
                                )} */}
                                {xlsxDocument && data ? (
                                    <GridComponent
                                        dataSource={data}
                                        editSettings={editOptions}
                                        toolbar={toolbarOptions}
                                        // allowGrouping={true}
                                        allowSorting={true}
                                        allowFiltering={true}
                                        // allowPaging={true}
                                        // pageSettings={pageSettings}
                                        filterSettings={filterSettings}
                                        // height={670}
                                        height={710}
                                    >
                                        <ColumnsDirective>
                                            {/* <ColumnDirective field="0" headerText="0" /> */}
                                            {Object.keys(xlsxDocument.Items[0]).map((key) => (
                                                <ColumnDirective key={key} field={key} headerText={key} />
                                            ))}
                                        </ColumnsDirective>
                                        <Inject services={[Edit, Toolbar, Filter, Sort]} />
                                    </GridComponent>
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
