import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';

export interface PEModalPopUpProps {
    openMenu: boolean;
    handleOpenMenu: () => void;
    width?: number;
}

export default function PEModalPopUp({
    openMenu,
    handleOpenMenu,
    children,
    width,
}: React.PropsWithChildren<PEModalPopUpProps>): ReactElement {
    const [open, setOpen] = useState(openMenu);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width ?? 750,
        boxSizing: 'border-box',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 4,
    };

    const handleClose = (): void => {
        setOpen(false);
        handleOpenMenu();
    };

    useEffect((): void => {
        setOpen(openMenu);
    }, [openMenu]);

    return (
        <div className="absolute -translate-y-0.5">
            <Modal
                ref={containerRef}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box ref={contentRef} sx={style}>
                    <div className="absolute right-4 top-4 z-10">
                        <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={handleClose} iconSize={24} />
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
