import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useMemo } from 'react';
import { FaPeopleGroup } from "react-icons/fa6";
import stringToColor from '@/utils/stringToColor';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function AdminDashboard({ auth, ...datas }: PageProps<{
    kelompokKecamatan: {
        kecamatan: string,
        total: number
    }[],
    user: any[],
    kelompok: any[],
    hasil: any[]
}>) {
    const jumlahBuah = useMemo(() => {
        return datas.hasil.reduce((a, b) => {
            return a + b.jumlah
        }, 0)
    }, [])

    const hasilKecamatan = useMemo(() => {
        const groupKecamatan = Object.groupBy(datas.hasil, ({ kelompok }) => kelompok.kecamatan)

        for (const hasil in groupKecamatan) {
            groupKecamatan[hasil] = groupKecamatan[hasil]?.reduce((a, b) => a + b.jumlah, 0)
        }

        return groupKecamatan
        
    }, [datas])

    

    return <>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">Halaman {auth.user.role == "admin" ? "Admin" : "Member"}</div>

                    <div className="flex items-center justify-center gap-10">
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
                            <div className="flex items-center">
                                <div className="p-4 bg-blue-500 rounded-full text-white">
                                    <FaPeopleGroup size={20} color='black' />
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold text-gray-900">{datas.kelompok.length || 0}</div>
                                    <div className="text-gray-600">Jumlah Kelompok</div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
                            <div className="flex items-center">
                                <div className="p-4 bg-blue-500 rounded-full text-white">
                                    <img src='/user.png' className='w-[30px]' />
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold text-gray-900">{datas.user.length || 0}</div>
                                    <div className="text-gray-600">Jumlah Pengguna</div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
                            <div className="flex items-center">
                                <div className="p-4 bg-blue-500 rounded-full text-white">
                                    <img src='/user.png' className='w-[30px]' />
                                </div>
                                <div className="ml-4">
                                    <div className="text-xl font-bold text-gray-900">{jumlahBuah || 0} ton</div>
                                    <div className="text-gray-600">Jumlah Hasil Tani</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className='px-6'>Kelompok Per Kecamatan</h2>
                    <div className='flex justify-center items-center'>
                        <div className='w-[50%] h-[50%]'>
                            <Pie data={{
                                labels: [...datas.kelompokKecamatan.map(el => el.kecamatan)],
                                datasets: [
                                    {
                                        label: "Jumlah",
                                        data: datas.kelompokKecamatan.map(el => el.total),
                                        backgroundColor: datas.kelompokKecamatan.map((el) => stringToColor(el.kecamatan))
                                    }
                                ]
                            }} />
                        </div>
                    </div>
                    <h2 className='px-6 mt-10'>Hasil Per Kecamatan</h2>
                    <div className='flex justify-center items-center'>
                        <div className='w-[50%] h-[50%]'>
                            <Pie options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (el) => {
                                                console.log(el)
                                                return el.parsed + " ton"
                                            }
                                        }
                                    }
                                }
                            }} data={{
                                labels: Object.keys(hasilKecamatan),
                                datasets: [
                                    {
                                        label: "Jumlah",
                                        data: Object.values(hasilKecamatan),
                                        backgroundColor: Object.keys(hasilKecamatan).map(el => stringToColor(el)),

                                    }
                                ],
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function MemeberDashbaord({ auth, ...datas }: PageProps<{

}>) {
    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Halaman Member</div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default function Dashboard({ auth, ...datas }: PageProps<any>) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {
                auth.user.role == "admin" ? <AdminDashboard auth={auth} {...datas} /> : <MemeberDashbaord auth={auth} {...datas} />
                   
            }

        </AuthenticatedLayout>
    );
}
