import { Button } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';

export default function PEHeader(): ReactElement {
    const { t } = useTranslation('common');

    return (
        <HStack gap={16} className="w-full max-w-screen-xl" style={{ alignItems: 'center', marginTop: 8 }}>
            <Link href={'/'} className="ml-4 no-underline">
                <Image src={'/logo.svg'} alt="" width={203} height={46} />
            </Link>

            <Link href={'/how-to-chef'} className="no-underline">
                <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('how-to-become-a-chef')}</Button>
            </Link>

            <Spacer />

            <Link href={'/sign-in'} className="mr-4 no-underline">
                <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('sign-in')}</Button>
            </Link>
        </HStack>
    );
}
