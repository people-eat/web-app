import { useMutation } from '@apollo/client';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import { ExpireCurrentSessionDocument } from '../../../data-source/generated/graphql';
import type { SignedInUser } from '../../../shared-domain/SignedInUser';
import VStack from '../../utility/vStack/VStack';
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
    const router = useRouter();
    const { t } = useTranslation('common');

    const [expireCurrentSession, { data }] = useMutation(ExpireCurrentSessionDocument);

    if (data?.users.sessions.success) void router.push('/');

    return (
        <PEModal openMenu={openMenu} handleOpenMenu={handleOpenMenu}>
            <Link href="/">
                <Image src="/logo.svg" alt="" width={203} height={46} style={{ margin: 16, marginTop: 32 }} />
            </Link>

            <VStack gap={16} style={{ alignItems: 'flex-start', margin: 16 }}>
                <Link className="no-underline w-full" href="/how-to-chef">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('how-to-become-a-chef')}</Button>
                </Link>

                <Link className="no-underline w-full" href="/about-us">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('about-us')}</Button>
                </Link>

                <Link className="no-underline w-full" href="/events">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('Events')}</Button>
                </Link>

                <Divider flexItem />

                {mobileMenuTabs &&
                    mobileMenuTabs.map((menuTab, index) => (
                        <Link onClick={(): void => handleOpenMenu(false)} key={index} className="no-underline" href={menuTab.link}>
                            <Button sx={{ minWidth: 0 }} style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>
                                {menuTab.title}
                            </Button>
                        </Link>
                    ))}

                {!signedInUser && (
                    <Link className="no-underline w-full" href={menuButtonLink ?? '/sign-in'}>
                        <PEButton onClick={(): void => undefined} title={menuButtonText ?? t('sign-in')} />
                    </Link>
                )}

                {signedInUser && !signedInUser.isCook && (
                    <Link className="no-underline w-full" href="/how-to-chef">
                        <PEButton onClick={(): void => undefined} title="Become a Chef" />
                    </Link>
                )}

                {signedInUser && signedInUser.isCook && window.location.href.includes('chef') && (
                    <Link className="no-underline w-full" href="/profile">
                        <PEButton onClick={(): void => undefined} title="User Profile" />
                    </Link>
                )}

                {signedInUser && signedInUser.isCook && !window.location.href.includes('chef') && (
                    <Link className="no-underline w-full" href="/chef-profile">
                        <PEButton onClick={(): void => undefined} title="Chef Profile" />
                    </Link>
                )}

                {signedInUser && (
                    <div style={{ marginTop: 8, width: '100%' }}>
                        <PEButton
                            title={t('sign-out')}
                            type="secondary"
                            onClick={(): void => void expireCurrentSession({ variables: { userId: signedInUser.userId } })}
                        />
                    </div>
                )}
            </VStack>
        </PEModal>
    );
}
