import Slide from '@mui/material/Slide';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import { Icon } from '../standard/icon/Icon';
import PEIconButton from '../standard/iconButton/PEIconButton';
import PEMobileMenu from '../standard/mobileMenu/PEMobileMenu';

export default function PEHeaderMobile(): ReactElement {
    const [openMenu, setOpenMenu] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            if (window.pageYOffset > 80) setSticky(true);
            else if (window.pageYOffset <= 160) setSticky(false);
        });
    }, []);

    return (
        <>
            <div
                className={classNames(
                    'flex mt-0 bg-white z-10 top-0 left-0 h-[80px] w-full justify-between px-4 box-border max-w-screen-xl',
                    'border-y-1 border-solid border-b-disabled border-transparent',
                )}
                style={{ alignItems: 'center', padding: '0px 16px', gap: 16 }}
            >
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt="" width={203} height={46} style={{ marginTop: 8 }} />
                </Link>

                <PEMobileMenu openMenu={openMenu} handleOpenMenu={setOpenMenu} />
                <PEIconButton iconSize={24} icon={Icon.burgerMenu} onClick={(): void => setOpenMenu(!openMenu)} bg="white" withoutShadow />
            </div>
            <Slide direction="down" in={sticky}>
                <div
                    className={classNames(
                        'flex mt-0 bg-white z-10 top-0 left-0 w-full justify-between px-4 box-border max-w-screen-xl',
                        'border-y-1 border-solid border-b-disabled border-transparent',
                        {
                            ['h-0 hidden']: !sticky,
                            ['lg:fixed h-[80px]']: sticky,
                        },
                    )}
                    style={{ alignItems: 'center', padding: '0px 16px', gap: 16 }}
                >
                    <Link href={'/'}>
                        <Image src={'/logo.svg'} alt="" width={203} height={46} style={{ marginTop: 8 }} />
                    </Link>

                    <PEMobileMenu openMenu={openMenu} handleOpenMenu={setOpenMenu} />
                    <PEIconButton
                        iconSize={24}
                        icon={Icon.burgerMenu}
                        onClick={(): void => setOpenMenu(!openMenu)}
                        bg="white"
                        withoutShadow
                    />
                </div>
            </Slide>
        </>
    );
}
