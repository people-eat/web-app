import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export default function PEFooter(): ReactElement {
    return (
        <div className={'w-full flex justify-center bg-footer py-15'}>
            <div className={'flex  max-w-[1180px] justify-between w-full'} style={{ padding: '8px' }}>
                <div className="flex flex-row gap-[100px]">
                    <div className="flex flex-col gap-4">
                        <Link href={'/'}>
                            <Image src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
                        </Link>
                        <Link href={'/how-to-chef'}>
                            <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>How to become a chef?</Button>
                        </Link>
                        <Link href={'/about-us'}>
                            <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>About us</Button>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Image src={'/instagram.png'} alt="" width={35} height={35} />
                        <PEIcon icon={Icon.facebook} edgeLength={35} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href={'/terms-and-conditions'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>Terms and Conditions</Button>
                    </Link>
                    <Link href={'/imprint'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>Imprint</Button>
                    </Link>
                    <Link href={'/data-privacy-policy'}>
                        <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>Data Privacy Policy</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
