import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export default function PEFooter(): ReactElement {
    return (
        <div className={'w-full flex justify-center bg-footer py-15'}>
            <div className={'flex  max-w-[1180px] justify-between w-full'}>
                <div className="flex flex-row gap-[100px]">
                    <div className="flex flex-col gap-4">
                        <PEIcon icon={Icon.apple} edgeLength={35} />
                        <span className="text-darkBlue">How to become a Chef</span>
                        <span className="text-darkBlue">About us</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <PEIcon icon={Icon.apple} edgeLength={35} />
                        <PEIcon icon={Icon.facebook} edgeLength={35} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-preBlack">Terms and Conditions</span>
                    <span className="text-preBlack">Imprint</span>
                    <span className="text-preBlack">Data Privacy Policy</span>
                </div>
            </div>
        </div>
    );
}
