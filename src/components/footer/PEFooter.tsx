import Button from '@mui/material/Button';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import VStack from '../utility/vStack/VStack';

interface PEFooterProps {
    className?: string;
}

export default function PEFooter({ className }: PEFooterProps): ReactElement {
    const { t } = useTranslation('common');

    return (
        <div className={classNames('w-full lg_min:p-15 md:p-10 box-border flex justify-center bg-footer py-15', className)}>
            <div className={'flex md:flex-col max-w-screen-xl justify-between w-full'} style={{ padding: '8px' }}>
                <div className="flex md:flex-col md:gap-4 flex-row gap-[100px]">
                    <div className="flex flex-col gap-4">
                        <Link className="no-underline" href={'/'}>
                            <Image unoptimized src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
                        </Link>
                        {/* <Link className="no-underline" href={'/how-to-chef'}>
                            <Button style={{ fontSize: 16, color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>
                                {t('how-to-become-a-chef')}
                            </Button>
                        </Link> */}
                        <Link className="no-underline" href={'/about-us'}>
                            <Button style={{ fontSize: 16, color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('about-us')}</Button>
                        </Link>
                    </div>
                    <div className="flex md:ml-2 md:mb-4 flex-row gap-4">
                        <Link target="_blank" className="no-underline" href="https://www.instagram.com/peopleeat_official/">
                            <Image unoptimized src={'/instagram.png'} alt="" width={35} height={35} />
                        </Link>
                        {/* <PEIcon icon={Icon.facebook} edgeLength={35} /> */}
                    </div>
                </div>
                <VStack style={{ alignItems: 'flex-start', gap: 4 }}>
                    <Link className="no-underline" href={'/terms-and-conditions'}>
                        <Button style={{ fontSize: 16, color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none', textAlign: 'left' }}>
                            {t('terms-and-conditions')}
                        </Button>
                    </Link>
                    <Link className="no-underline" href={'/imprint'}>
                        <Button style={{ fontSize: 16, color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none', textAlign: 'left' }}>
                            {t('imprint')}
                        </Button>
                    </Link>
                    <Link className="no-underline" href={'/data-privacy-policy'}>
                        <Button style={{ fontSize: 16, color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none', textAlign: 'left' }}>
                            {t('data-privacy-policy')}
                        </Button>
                    </Link>
                </VStack>
            </div>
        </div>
    );
}
