import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import type { SignedInUser } from '../../../shared-domain/SignedInUser';
import PEButton from '../buttons/PEButton';
import PEModal from '../modal/PEModal';

export interface PEMobileMenuProps {
    openMenu: boolean;
    handleOpenMenu: (value: boolean) => void;
    mobileMenuTabs?: { title: string; link: string }[];
    menuButtonText?: string;
    menuButtonLink?: string;
    signedInUser?: SignedInUser;
}

export default function PEMobileMenu({
    openMenu,
    handleOpenMenu,
    mobileMenuTabs,
    menuButtonText,
    menuButtonLink,
    signedInUser,
}: PEMobileMenuProps): ReactElement {
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
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('how-to-become-a-chef')}</Button>
                </Link>

                <Link className="no-underline" href="/about-us">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('about-us')}</Button>
                </Link>
                <Link className="no-underline" href="/events">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('Events')}</Button>
                </Link>

                <div className="w-full h-[1px] bg-disabled my-6"></div>

                {mobileMenuTabs &&
                    mobileMenuTabs.map((menuTab, index) => (
                        <Link onClick={(): void => handleOpenMenu(false)} key={index} className="no-underline" href={menuTab.link}>
                            <Button sx={{ minWidth: 0 }} style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>
                                {menuTab.title}
                            </Button>
                        </Link>
                    ))}

                {signedInUser?.firstName === undefined && (
                    <Link className="no-underline mt-4" href={menuButtonLink ?? '/sign-in'}>
                        <PEButton onClick={(): void => undefined} title={menuButtonText ?? t('sign-in')} />
                    </Link>
                )}
                {signedInUser?.firstName !== undefined && !signedInUser.isCook && (
                    <Link className="no-underline mt-4" href="/how-to-chef">
                        <PEButton onClick={(): void => undefined} title="Become a Chef" />
                    </Link>
                )}
                {signedInUser?.firstName !== undefined && signedInUser.isCook && window.location.href.includes('chef') && (
                    <Link className="no-underline mt-4" href="/profile">
                        <PEButton onClick={(): void => undefined} title="User Profile" />
                    </Link>
                )}
                {signedInUser?.firstName !== undefined && signedInUser.isCook && !window.location.href.includes('chef') && (
                    <Link className="no-underline mt-4" href="/chef">
                        <PEButton onClick={(): void => undefined} title="Chef Profile" />
                    </Link>
                )}
            </div>
        </PEModal>
    );
}
