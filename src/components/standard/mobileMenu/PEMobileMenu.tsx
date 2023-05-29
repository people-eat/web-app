import Button from '@mui/material/Button';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../buttons/PEButton';
import PEModal from '../modal/PEModal';

export interface PEMobileMenu {
    openMenu: boolean;
    handleOpenMenu: (value: boolean) => void;
}

export default function PEMobileMenu({ openMenu, handleOpenMenu }: PEMobileMenu): ReactElement {
    const { t } = useTranslation('common');

    return (
        <PEModal openMenu={openMenu} handleOpenMenu={handleOpenMenu}>
            <>
                <div
                    className={classNames(
                        'flex mt-0 bg-white z-10 top-0 left-0 h-[80px] w-full justify-between px-4 box-border max-w-screen-xl',
                    )}
                    style={{ alignItems: 'center', padding: '0px 16px', gap: 16 }}
                >
                    <Link href={'/'}>
                        <Image src={'/logo.svg'} alt="" width={203} height={46} style={{ marginTop: 8 }} />
                    </Link>
                </div>
                <div className="flex flex-col p-4">
                    <Link className="no-underline" href={'/how-to-chef'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('how-to-become-a-chef')}</Button>
                    </Link>
                    <Link className="no-underline" href={'/about-us'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('about-us')}</Button>
                    </Link>
                    <div className="w-full h-[1px] bg-disabled my-6"></div>
                    <Link className="no-underline" href={'/sign-in'}>
                        <PEButton onClick={(): void => undefined} title={'Sign In'} />
                    </Link>
                </div>
            </>
        </PEModal>
    );
}
