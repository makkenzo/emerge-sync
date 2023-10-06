import { Sidenav } from '@/components';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { filesTableData } from '@/data/files-table-data';
import Image from 'next/image';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const files = () => {
    return (
        <div className="min-h-screen bg-slate-200 flex">
            <Sidenav />

            <div className="container mx-auto py-8">
                <div className="mt-4 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader variant="filled" color="blue-gray" className="mb-8 p-6">
                            Файлы
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {['имя', 'прикреплен к', 'действие'].map((el) => (
                                            <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
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
                                    {filesTableData.map((file, index) => (
                                        <tr key={index} className="border-b border-blue-gray-100">
                                            <td className="py-3 px-5 text-left">{file.file}</td>
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
                                                <button className="mr-2 text-[#56CCF2] hover:bg-blue-gray-100 p-2 rounded-full">
                                                    <AiFillEdit size={20} />
                                                </button>
                                                <button className="text-red-600 hover:bg-blue-gray-100 p-2 rounded-full">
                                                    <AiFillDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default files;
