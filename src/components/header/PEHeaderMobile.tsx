import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import PESideBar from '../standard/sideBar/PESideBar';
import HStack from '../utility/hStack/HStack';
import VStack from '../utility/vStack/VStack';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeaderMobile({ signedInUser }: PEHeaderProps): ReactElement {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            if (window.pageYOffset > 80) setSticky(true);
            else if (window.pageYOffset <= 160) setSticky(false);
        });
    }, []);

    return (
        <VStack style={{ width: '100%' }}>
            <HStack
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
            >
                <Link href="/">
                    <Image src="/people-eat-logo-title.png" alt="" width={203} height={46} style={{ marginTop: 8 }} />
                </Link>

                <IconButton onClick={(): void => setSideBarOpen(!sideBarOpen)}>
                    <MenuIcon />
                </IconButton>
            </HStack>

            <Slide direction="down" in={sticky}>
                <div
                    className={classNames(
                        'flex mt-0 bg-white z-50 top-0 left-0 w-full justify-between px-4 box-border max-w-screen-xl border-y-[1px] border-solid border-b-disabled border-transparent',
                        { ['h-0 hidden']: !sticky, ['lg:fixed']: sticky },
                    )}
                    style={{ alignItems: 'center', paddingLeft: 16, paddingRight: 16, gap: 16 }}
                >
                    <Link href="/">
                        <Image src="/logo.svg" alt="" width={203} height={46} style={{ marginTop: 8 }} />
                    </Link>

                    <IconButton onClick={(): void => setSideBarOpen(!sideBarOpen)}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </Slide>

            <Divider flexItem />

            <PESideBar open={sideBarOpen} setOpen={setSideBarOpen} signedInUser={signedInUser} />
        </VStack>
    );
}
