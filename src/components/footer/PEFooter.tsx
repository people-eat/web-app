import { Button } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { Icon } from '../standard/icon/Icon';
import PEIcon from '../standard/icon/PEIcon';
import VStack from '../utility/vStack/VStack';

export default function PEFooter(): ReactElement {
    const { t } = useTranslation('common');

    return (
        <div className={'w-full flex justify-center bg-footer py-15'}>
            <div className={'flex max-w-screen-xl justify-between w-full'} style={{ padding: '8px' }}>
                <div className="flex flex-row gap-[100px]">
                    <div className="flex flex-col gap-4">
                        <Link href={'/'}>
                            <Image src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
                        </Link>
                        <Link href={'/how-to-chef'}>
                            <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('how-to-become-a-chef')}</Button>
                        </Link>
                        <Link href={'/about-us'}>
                            <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('about-us')}</Button>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Image src={'/instagram.png'} alt="" width={35} height={35} />
                        <PEIcon icon={Icon.facebook} edgeLength={35} />
                    </div>
                </div>
                <VStack style={{ alignItems: 'flex-start', gap: 4 }}>
                    <Link href={'/terms-and-conditions'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('terms-and-conditions')}</Button>
                    </Link>
                    <Link href={'/imprint'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('imprint')}</Button>
                    </Link>
                    <Link href={'/data-privacy-policy'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('data-privacy-policy')}</Button>
                    </Link>
                </VStack>
            </div>
        </div>
    );
}
