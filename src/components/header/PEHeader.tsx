import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';

export default function PEHeader(): ReactElement {
    return (
        <>
            <HStack className="w-full max-w-screen-lg" style={{ alignItems: 'center', padding: '0px 16px' }}>
                <Link href={'/'}>
                    <Image src={'/people-eat-logo-title.jpeg'} alt="" width={200} height={100} />
                </Link>

                <Link href={'/how-to-chef'}>
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>How to become a chef?</Button>
                </Link>

                <Spacer />

                <Link href={'/sign-in'}>
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>Sign in</Button>
                </Link>
            </HStack>
        </>
    );
}