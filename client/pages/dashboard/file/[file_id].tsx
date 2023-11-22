'use client';

import { Sidenav } from '@/components';
import instance, { SERVICE_URI } from '@/lib/api';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { registerLicense } from '@syncfusion/ej2-base';
import { DataManager, Query, RemoteSaveAdaptor, ReturnOption, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {
    ColumnDirective,
    ColumnsDirective,
    Edit,
    ExcelExport,
    Filter,
    Grid,
    GridComponent,
    Inject,
    Page,
    Sort,
    Toolbar,
} from '@syncfusion/ej2-react-grids';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { PiExport } from 'react-icons/pi';

interface ResponseData {
    Items: any[];
    Count: number;
}

const FilePage = () => {
    registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9eeXRWQmFdVUJ/X0o=');
    const router = useRouter();
    const fileId = router.query.file_id;

    const [xlsxDocument, setDocument] = useState<ResponseData>();
    const [filePath, setFilePath] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/workflow_item/without_pagination/${fileId}`, { headers });
                setDocument(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (fileId !== undefined) {
            fetchData();
        }
    }, [setDocument, fileId]);

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
        updateUrl: `${SERVICE_URI}/workflow_item/${fileId}/`,
    });

    let grid: Grid | null;

    const pageSettings: object = { pageSize: 19 };
    const filterSettings: object = { type: 'Excel' };

    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport'];
    const toolbarClick = (args: ClickEventArgs) => {
        if (grid && args.item.id === 'grid_659440375_0_excelexport') {
            grid.excelExport();
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
                        </CardHeader>
                        <CardBody className="px-0 pt-0 pb-2 gap-4">
                            <div className="w-[1300px] h-[795px] overflow-x-auto flex mx-4">
                                {xlsxDocument && data ? (
                                    <GridComponent
                                        dataSource={data}
                                        editSettings={editOptions}
                                        toolbar={toolbarOptions}
                                        // allowGrouping={true}
                                        allowSorting={true}
                                        allowFiltering={true}
                                        allowPaging={true}
                                        pageSettings={pageSettings}
                                        filterSettings={filterSettings}
                                        height={670}
                                        // height={710}
                                        allowExcelExport={true}
                                        toolbarClick={toolbarClick}
                                        ref={(g) => (grid = g)}
                                    >
                                        <ColumnsDirective>
                                            {/* <ColumnDirective field="0" headerText="0" /> */}
                                            {Object.keys(xlsxDocument.Items[0]).map((key) => {
                                                if (key === '_id' || key === 'workflow_id') {
                                                    return (
                                                        <ColumnDirective
                                                            key={key}
                                                            field={key}
                                                            headerText={key}
                                                            visible={false}
                                                        />
                                                    );
                                                } else {
                                                    return <ColumnDirective key={key} field={key} headerText={key} />;
                                                }
                                            })}
                                        </ColumnsDirective>
                                        <Inject services={[Edit, Toolbar, Filter, Sort, ExcelExport, Page]} />
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
