import { useMutation } from '@apollo/client';
import { AccountBox, Dining } from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { ExpireCurrentSessionDocument } from '../../../data-source/generated/graphql';
import type { SignedInUser } from '../../../shared-domain/SignedInUser';
import { cookProfileTabs } from '../../../shared-domain/profileTabs/cookProfileTabs';
import { userProfileTabs } from '../../../shared-domain/profileTabs/userProfileTabs';
import VStack from '../../utility/vStack/VStack';
import PEButton from '../buttons/PEButton';
import PEModal from '../modal/PEModal';

export interface PEMobileMenuProps {
    open: boolean;
    setOpen: (changedOpen: boolean) => void;
    signedInUser?: SignedInUser;
}

export default function PESideBar({ open, setOpen, signedInUser }: PEMobileMenuProps): ReactElement {
    const router = useRouter();
    const { t } = useTranslation('common');

    const [userProfileTabsOpen, setUserProfileTabsOpen] = useState(true);
    const [cookProfileTabsOpen, setCookProfileTabsOpen] = useState(true);

    const [expireCurrentSession, { data }] = useMutation(ExpireCurrentSessionDocument);

    if (data?.users.sessions.success) void router.push('/');

    function onSignOut(): void {
        if (!signedInUser) return;
        void expireCurrentSession({ variables: { userId: signedInUser.userId } });
        setOpen(false);
    }

    return (
        <PEModal openMenu={open} handleOpenMenu={setOpen}>
            <Link href="/">
                <Image src="/logo.svg" alt="" width={203} height={46} style={{ margin: 16, marginTop: 32 }} />
            </Link>

            <List>
                {signedInUser && (
                    <>
                        <Divider flexItem />
                        <ListItem disablePadding>
                            <ListItemButton onClick={(): void => setUserProfileTabsOpen(!userProfileTabsOpen)}>
                                <ListItemIcon>
                                    <AccountBox />
                                </ListItemIcon>
                                <ListItemText>{t('profile-user-label')}</ListItemText>
                                {userProfileTabsOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={userProfileTabsOpen}>
                            <List>
                                {userProfileTabs.map(({ translationKey, path }) => (
                                    <ListItem disablePadding key={path} sx={{ pl: 0 }}>
                                        <Link
                                            href={path}
                                            className="w-full no-underline"
                                            style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon />
                                                <ListItemText>{t(translationKey)}</ListItemText>
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </>
                )}

                {signedInUser?.isCook && (
                    <>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton onClick={(): void => setCookProfileTabsOpen(!cookProfileTabsOpen)}>
                                <ListItemIcon>
                                    <Dining />
                                </ListItemIcon>
                                <ListItemText>{t('profile-cook-label')}</ListItemText>
                                {cookProfileTabsOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={cookProfileTabsOpen}>
                            {cookProfileTabs.map(({ translationKey, path }) => (
                                <ListItem disablePadding key={path} sx={{ pl: 0 }}>
                                    <Link href={path} className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                                        <ListItemButton>
                                            <ListItemIcon />
                                            <ListItemText>{t(translationKey)}</ListItemText>
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                        </Collapse>
                    </>
                )}

                <Divider />

                <ListItem disablePadding>
                    <Link href="/how-to-chef" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemIcon />
                            <ListItemText>{t('how-to-become-a-chef')}</ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem disablePadding>
                    <Link href="/about-us" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemIcon />
                            <ListItemText>{t('about-us')}</ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem disablePadding>
                    <Link href="/events" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemIcon />
                            <ListItemText>Events</ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <Divider />
            </List>

            <VStack gap={16} style={{ alignItems: 'flex-start', margin: 16 }}>
                {!signedInUser && (
                    <>
                        <Link href="/sign-in" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                            <PEButton title={t('sign-in')} onClick={(): void => undefined} />
                        </Link>

                        <Link href="/sign-up" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                            <PEButton type="secondary" title={t('sign-up')} onClick={(): void => undefined} />
                        </Link>

                        <Link href="/chef-sign-up" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                            <PEButton type="secondary" title={t('how-to-become-a-chef')} onClick={(): void => undefined} />
                        </Link>
                    </>
                )}

                {signedInUser && (
                    <>
                        {!signedInUser.isCook && (
                            <Link href="/chef-sign-up" className="w-full no-underline" style={{ textDecoration: 'none', color: 'black' }}>
                                <PEButton title={t('how-to-become-a-chef')} onClick={(): void => undefined} />
                            </Link>
                        )}
                        <div style={{ marginTop: 8, width: '100%' }}>
                            <PEButton title={t('sign-out')} type="secondary" onClick={onSignOut} />
                        </div>
                    </>
                )}
            </VStack>
        </PEModal>
    );
}
