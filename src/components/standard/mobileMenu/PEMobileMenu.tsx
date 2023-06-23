import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../buttons/PEButton';
import PEModal from '../modal/PEModal';

export interface PEMobileMenuProps {
    openMenu: boolean;
    handleOpenMenu: (value: boolean) => void;
    mobileMenuTabs?: { title: string; link: string }[];
}

export default function PEMobileMenu({ openMenu, handleOpenMenu, mobileMenuTabs }: PEMobileMenuProps): ReactElement {
    const { t } = useTranslation('common');

    return (
        <PEModal openMenu={openMenu} handleOpenMenu={handleOpenMenu}>
            <div
                className="flex mt-0 bg-white z-10 top-0 left-0 h-[80px] w-full justify-between px-4 box-border max-w-screen-xl"
                style={{ alignItems: 'center', padding: '0px 16px', gap: 16 }}
            >
                <Link href="/">
                    <Image src={'/logo.svg'} alt="" width={203} height={46} style={{ marginTop: 8 }} />
                </Link>
            </div>

            <div className="flex flex-col p-4">
                <Link className="no-underline" href={'/how-to-chef'}>
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'capitalize' }}>{t('how-to-become-a-chef')}</Button>
                </Link>

                <Link className="no-underline" href="/about-us">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'capitalize' }}>{t('about-us')}</Button>
                </Link>

                <div className="w-full h-[1px] bg-disabled my-6"></div>

                {mobileMenuTabs &&
                    mobileMenuTabs.map((menuTab, index) => (
                        <Link onClick={(): void => handleOpenMenu(false)} key={index} className="no-underline" href={menuTab.link}>
                            <Button sx={{ minWidth: 0 }} style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'capitalize' }}>
                                {menuTab.title}
                            </Button>
                        </Link>
                    ))}

                <Link className="no-underline mt-4" href="/sign-in">
                    <PEButton onClick={(): void => undefined} title={t('sign-in')} />
                </Link>
            </div>
        </PEModal>
    );
}
