import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index: NextPage = () => {
    const router = useRouter();
    useEffect(() => void router.push('/'), [router]);
    return <></>;
};

export default Index;
