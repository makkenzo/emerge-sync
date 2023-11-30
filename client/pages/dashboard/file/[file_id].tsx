'use client';

import { Sidenav } from '@/components';
import instance, { SERVICE_URI } from '@/lib/api';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import { L10n, registerLicense } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
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
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

interface ResponseData {
    Items: any[];
    Count: number;
}

const FilePage = () => {
    registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9eeXRWQmFdVUJ/X0o=');
    const router = useRouter();
    const fileId = router.query.file_id;
    const [permission, setPermission] = useState(true);
    const excludedKeys = ['_id', 'workflow_id'];
    const [xlsxDocument, setDocument] = useState<ResponseData>();
    const items = xlsxDocument?.Items;

    // Find the element with the maximum number of keys
    const maxKeysElement = items?.reduce(
        (prev, current) => (Object.keys(prev).length > Object.keys(current).length ? prev : current),
        {}
    );
    const columns = Object.keys(maxKeysElement ?? []).filter((key) => !excludedKeys.includes(key) ?? false);
    useEffect(() => {
        // Check if the token is not present in localStorage, and redirect to the login page
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth');
        }
    }, [router]);
    L10n.load({
        'ru-RU': {
            grid: {
                Add: 'Добавить',
                Edit: 'Редактировать',
                Delete: 'Удалить',
                Update: 'Сохранить изменения',
                Cancel: 'Отмена',
                Excelexport: 'Экспорт в Excel',
                EmptyRecord: 'Нет данных для отображения',
                EditOperationAlert: 'Нет записей, выбранных для редактирования',
            },
            pager: {
                currentPageInfo: '{0} из {1} страниц',
                totalItemsInfo: '({0} позиций)',
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tok = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${tok}`,
                    'Content-Type': 'multipart/form-data',
                };
                const response = await instance.get(`/workflow_item/without_pagination/${fileId}`, { headers });
                setDocument(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRole = async () => {
            try {
                const tok = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${tok}`,
                    'Content-Type': 'multipart/form-data',
                };
                const userId = localStorage.getItem('userId');

                const response = await instance.get(`/role/my_role/${fileId}`, { headers });

                if (response.status === 200) {
                    setPermission(response.data.can_modify);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (fileId !== undefined) {
            fetchData();
            fetchRole();
        }
    }, [setDocument, fileId]);

    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token') ?? '');
    }, []);
    useEffect(() => {
        // Check if the token is not present in localStorage, and redirect to the login page
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);
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
    const updatedToolbarOptions = toolbarOptions.filter((option) => {
        return !(['Add', 'Edit', 'Delete', 'Update', 'Cancel'].includes(option) && !permission);
    });
    const toolbarClick = (args: ClickEventArgs) => {
        if (grid && args.item.id === 'grid_excelexport') {
            grid.excelExport();
        }
    };

    return (
        <>
            <Head>
                <title>ExcelStockList | Обзор файла</title>
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
                                {xlsxDocument && data && columns.length > 0 ? (
                                    <GridComponent
                                        id="grid"
                                        dataSource={data}
                                        editSettings={editOptions}
                                        toolbar={permission ? toolbarOptions : updatedToolbarOptions}
                                        // allowGrouping={true}
                                        // allowSorting={true}
                                        // allowFiltering={true}
                                        allowPaging={true}
                                        pageSettings={pageSettings}
                                        filterSettings={filterSettings}
                                        height={650}
                                        allowExcelExport={true}
                                        toolbarClick={toolbarClick}
                                        ref={(g) => (grid = g)}
                                        locale="ru-RU"
                                    >
                                        <ColumnsDirective>
                                            {Object.keys(maxKeysElement).map((key) => {
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
                                                    return (
                                                        <ColumnDirective
                                                            key={key}
                                                            field={key}
                                                            headerText={key}
                                                            width={150}
                                                            minWidth={150}
                                                        />
                                                    );
                                                }
                                            })}
                                        </ColumnsDirective>
                                        <Inject
                                            services={
                                                permission
                                                    ? [Edit, Toolbar, ExcelExport, Page]
                                                    : [Toolbar, ExcelExport, Page]
                                            }
                                        />
                                    </GridComponent>
                                ) : (
                                    <h1 style={{ textAlign: 'center', margin: 'auto' }}>Нет данных для отображения</h1>
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
