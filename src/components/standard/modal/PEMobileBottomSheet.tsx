import { Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { type TransitionProps } from '@mui/material/transitions';
import { forwardRef, type PropsWithChildren, type ReactElement } from 'react';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { Icon } from '../icon/Icon';
import PEIconButton from '../iconButton/PEIconButton';

export interface PEMobileBottomSheetProps {
    title: string;
    open: boolean;
    onClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PEMobileBottomSheet({ title, open, onClose, children }: PropsWithChildren<PEMobileBottomSheetProps>): ReactElement {
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <VStack style={{ margin: 16, alignItems: 'stretch' }} gap={16}>
                <HStack className="w-full">
                    <Spacer />
                    <PEIconButton icon={Icon.close} withoutShadow bg="white" iconSize={24} onClick={onClose} />
                </HStack>

                <h2 className="m-0 pb-5 w-full">{title}</h2>

                {children}
            </VStack>
        </Dialog>
    );
}
