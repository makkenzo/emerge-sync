import { setCurrentPage } from '@/redux/slices/fileSlice';
import { RootState } from '@/redux/store';
import { AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

import { filesTableData } from '@/data/files-table-data';

import { AddFileModal, DeleteButtonModal, Sidenav } from '@/components';

import instance from '@/lib/api';
import { UserData, XlsxDocument } from '@/types';
import { Button } from 'flowbite-react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { toast } from 'react-toastify';

const Files = () => {
    const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>();
    const [userFiles, setUserFiles] = useState<XlsxDocument[]>([]);

    const dispatch = useDispatch();

    const currentPage = useSelector((state: RootState) => state.files.currentPage);
    const itemsPerPage = useSelector((state: RootState) => state.files.itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filesTableData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filesTableData.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleAddFile = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const isSinglePage = userFiles.length <= itemsPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                };

                const userResponse = await instance.get(`/user`, { headers });

                const userData = userResponse.data;
                setUserData(userData);

                const documentsResponse = await instance.get('/workflow', { headers });

                const documents: XlsxDocument[] = documentsResponse.data;

                setUserFiles(documents);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        userFiles;
    }, [userFiles]);

    return (
        <>
            <Head>
                <title>ExcelStockList | Панель</title>
            </Head>
            <div className="min-h-screen bg-slate-200 flex">
                <Sidenav />
                <div className="container mx-auto pt-8">
                    <div className="mt-4 flex flex-col justify-between h-[880px]">
                        <Card>
                            <CardHeader variant="filled" color="blue-gray" className="mb-8 p-6">
                                Файлы
                            </CardHeader>
                            <CardBody className="px-0 pt-0 pb-2">
                                {userFiles.length < 1 ? (
                                    <div className="text-center mb-4">
                                        <p>Файлов нет</p>
                                    </div>
                                ) : (
                                    <table className="w-full min-w-[640px] table-auto">
                                        <thead>
                                            <tr>
                                                {['имя', '', '', 'дата', 'действие'].map((el) => (
                                                    <th
                                                        key={el}
                                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                        >
                                                            {el}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userFiles.map((file, index) => (
                                                <tr key={index} className="border-b border-blue-gray-100">
                                                    <td className="py-3 px-5 text-left">{file.name}</td>
                                                    <td className="py-3 px-5 text-left"></td>
                                                    <td className="py-3 px-5 text-left">
                                                        {/* {userData?.first_name} */}
                                                    </td>
                                                    <td className="py-3 px-5 text-left">
                                                        {String(new Date(file.create_at).toLocaleString())}
                                                    </td>
                                                    <td className="py-3 px-5 text-left">
                                                        <div className="flex">
                                                            <Link
                                                                href={`/dashboard/file/${file._id}`}
                                                                className="mr-2 text-[#52cf4c] hover:text-black"
                                                            >
                                                                <AiFillEdit size={20} />
                                                            </Link>
                                                            {file.is_creator ? (
                                                                <DeleteButtonModal file={file.name} fileId={file._id} />
                                                            ) : null}
                                                            <Link
                                                                href={`/dashboard/file/access/${file._id}`}
                                                                className="ml-2 text-[#56CCF2] hover:text-black"
                                                            >
                                                                {file.is_creator ? <IoMdSettings size={20} /> : null}
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </CardBody>
                        </Card>
                        <div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-sm text-gray-700 dark:text-gray-400">
                                    Показаны с{' '}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {indexOfFirstItem + 1}
                                    </span>{' '}
                                    по{' '}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {Math.min(indexOfLastItem, userFiles.length)}
                                    </span>{' '}
                                    из{' '}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {userFiles.length}
                                    </span>{' '}
                                    записей
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#607d8b] rounded-l hover:bg-[#4c6470]"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Назад
                                    </button>
                                    <button
                                        className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#607d8b] border-0 border-l border-gray-700 rounded-r hover:bg-[#4c6470]"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages || isSinglePage}
                                    >
                                        Вперед
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleAddFile} className="bg-[#607d8b]">
                                    <AiFillFileAdd size={15} className="mr-2" />
                                    Добавить
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {userData && <AddFileModal isModalOpen={isModalOpen} closeModal={closeModal} userData={userData} />}
        </>
    );
};

export default Files;
