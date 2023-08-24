import { useMutation } from '@apollo/client';
import { AccountBox, AdminPanelSettings, Dining, Logout } from '@mui/icons-material';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { ExpireCurrentSessionDocument } from '../../data-source/generated/graphql';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeaderDesktop({ signedInUser }: PEHeaderProps): ReactElement {
    const { t } = useTranslation('common');
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [expireCurrentSession, { data }] = useMutation(ExpireCurrentSessionDocument);

    if (data?.users.sessions.success) void router.push('/');

    return (
        <HStack gap={16} className="w-full max-w-screen-xl" style={{ alignItems: 'center', marginTop: 8 }}>
            <Link href="/" className="ml-4 no-underline">
                <Image src="/logo.svg" alt="" width={203} height={46} priority />
            </Link>

            <Link href="/how-to-chef" className="no-underline">
                <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('how-to-become-a-chef')}</Button>
            </Link>
            <Link href="/events" className="no-underline">
                <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('Events')}</Button>
            </Link>

            <Spacer />

            {!signedInUser && (
                <Link href="/sign-in" className="mr-4 no-underline">
                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}>{t('sign-in')}</Button>
                </Link>
            )}

            {signedInUser && (
                <>
                    <Button
                        style={{ color: 'rgba(31, 31, 31, 0.8)', textTransform: 'none' }}
                        onClick={(event): void => setAnchorEl(event.currentTarget)}
                    >
                        {signedInUser.profilePictureUrl && (
                            <Image
                                width={32}
                                height={32}
                                alt="profile picture"
                                src={signedInUser.profilePictureUrl}
                                style={{ borderRadius: '50%' }}
                            />
                        )}
                        {!signedInUser.profilePictureUrl && signedInUser.firstName}
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={(): void => setAnchorEl(null)}
                        onClick={(): void => setAnchorEl(null)}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Link href="/profile" style={{ textDecoration: 'none', color: '#000' }}>
                                <HStack gap={16}>
                                    <AccountBox color="disabled" /> {t('header-user-profile')}
                                </HStack>
                            </Link>
                        </MenuItem>

                        {signedInUser.isCook && (
                            <MenuItem>
                                <Link href="/chef-profile" style={{ textDecoration: 'none', color: '#000' }}>
                                    <HStack gap={16}>
                                        <Dining color="disabled" /> {t('header-chef-profile')}
                                    </HStack>
                                </Link>
                            </MenuItem>
                        )}

                        {signedInUser.isAdmin && (
                            <MenuItem>
                                <Link href="/administration" style={{ textDecoration: 'none', color: '#000' }}>
                                    <HStack gap={16}>
                                        <AdminPanelSettings color="disabled" /> Administration
                                    </HStack>
                                </Link>
                            </MenuItem>
                        )}

                        <Divider />

                        <MenuItem onClick={(): void => void expireCurrentSession({ variables: { userId: signedInUser.userId } })}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            {t('sign-out')}
                        </MenuItem>
                    </Menu>
                </>
            )}
        </HStack>
    );
}
