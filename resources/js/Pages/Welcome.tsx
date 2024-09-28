import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    useEffect(() => {
        console.log(auth)
    }, [])
    return (
        <>
            <Head title="Welcome" />
            <div>
                
            </div>
        </>
    );
}
