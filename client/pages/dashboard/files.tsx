import { AiFillEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@/redux/slices/fileSlice';
import { RootState } from '@/redux/store';

import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

import { filesTableData } from '@/data/files-table-data';

import { DeleteButtonModal, Sidenav } from '@/components';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const Files = () => {
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

    return (
        <>
            <Head>
                <title>EmergeSync | Files</title>
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
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {['имя', '', 'прикреплен к', 'действие'].map((el) => (
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
                                        {currentItems.map((file, index) => (
                                            <tr key={index} className="border-b border-blue-gray-100">
                                                <td className="py-3 px-5 text-left">{file.file}</td>
                                                <td className="py-3 px-5 text-left"></td>
                                                <td className="py-3 px-5 text-left flex items-center">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                                        <Image
                                                            src={file.imgAssignedTo}
                                                            alt="pfp"
                                                            width={80}
                                                            height={80}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    {file.assignedTo}
                                                </td>
                                                <td className="py-3 px-5 text-left">
                                                    <div className="flex">
                                                        <Link
                                                            href={`/dashboard/file/${file._id}`}
                                                            className="mr-2 text-[#56CCF2] hover:text-black"
                                                        >
                                                            <AiFillEdit size={20} />
                                                        </Link>
                                                        <DeleteButtonModal file={file.file} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                                Показаны с{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {indexOfFirstItem + 1}
                                </span>{' '}
                                по{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {Math.min(indexOfLastItem, filesTableData.length)}
                                </span>{' '}
                                из{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {filesTableData.length}
                                </span>{' '}
                                записей
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#607d8b] rounded-l hover:bg-[#4c6470]"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <button
                                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#607d8b] border-0 border-l border-gray-700 rounded-r hover:bg-[#4c6470]"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Files;
