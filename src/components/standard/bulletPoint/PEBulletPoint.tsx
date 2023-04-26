import { type ReactElement } from 'react';
import HStack from '../../utility/hStack/HStack';
import { type Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';

export interface PEBulletPointProps {
    icon: Icon;
    text: string;
}

export default function PEBulletPoint({ icon, text }: PEBulletPointProps): ReactElement {
    return (
        <>
            <HStack style={{ alignItems: 'center', justifyContent: 'left', gap: 16, width: '300px' }}>
                <div className="bg-white shadow-md" style={{ padding: 30, borderRadius: '50%' }}>
                    <PEIcon icon={icon} edgeLength={20} />
                </div>
                <span style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{text}</span>
            </HStack>
        </>
    );
}
