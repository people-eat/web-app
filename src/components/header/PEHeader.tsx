import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeader({ signedInUser }: PEHeaderProps): ReactElement {
    const { t } = useTranslation('common');

    return (
        <HStack gap={16} className="w-full max-w-screen-xl" style={{ alignItems: 'center', marginTop: 8 }}>
            <Link href={'/'} className="ml-4 no-underline">
                <Image src={'/logo.svg'} alt="" width={203} height={46} priority />
            </Link>

            {(!signedInUser || !signedInUser?.isCook) && (
                <Link href={'/how-to-chef'} className="no-underline">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('how-to-become-a-chef')}</Button>
                </Link>
            )}

            <Spacer />

            {!signedInUser && (
                <Link href={'/sign-in'} className="mr-4 no-underline">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('sign-in')}</Button>
                </Link>
            )}

            {signedInUser?.isAdmin && (
                <Link href={'/administration'} className="mr-4 no-underline">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{'Administration'}</Button>
                </Link>
            )}

            {signedInUser && (
                <Link href={'/profile'} className="mr-4 no-underline">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{'Profile'}</Button>
                </Link>
            )}
        </HStack>
    );
}
