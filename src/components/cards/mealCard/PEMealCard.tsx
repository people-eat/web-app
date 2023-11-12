import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEMealCardDesktop from './PEMealCardDesktop';
import PEMealCardMobile from './PEMealCardMobile';
import { type PEMealCardProps } from './PEMealCardProps';

export default function PEMEalCard(props: PEMealCardProps): ReactElement {
    const { isMobile } = useResponsive();

    return isMobile ? <PEMealCardMobile {...props} /> : <PEMealCardDesktop {...props} />;
}
