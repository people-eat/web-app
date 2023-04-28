import { type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

interface FeatureCardProps {
    title: string;
    featureIcon: Icon;
}

export default function FeatureCard({ title, featureIcon }: FeatureCardProps): ReactElement {
    return (
        <VStack
            className="w-[200px] max-w-[calc(33%-80px)] lg:min-w-[42%] lg:max-w-[calc(50%-80px)] h-[165px] flex border-disabled rounded-4 border-solid px-8 md:px-2 border-[1px]"
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <HStack className="bg-base rounded-4 w-15 h-15" style={{ alignItems: 'center' }}>
                <PEIcon icon={featureIcon} edgeLength={36} />
            </HStack>
            <p className="max-w-[310px] text-center mb-0 md:text-text-sm text-heading-ss-bold">{title}</p>
        </VStack>
    );
}
