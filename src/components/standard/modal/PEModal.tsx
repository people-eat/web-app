import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';

const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '80%',
    height: '100vh',
    boxSizing: 'border-box',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

export interface PEModalProps {
    openMenu: boolean;
    handleOpenMenu: (value: boolean) => void;
}

export default function PEModal({ openMenu, handleOpenMenu }: PEModalProps): ReactElement {
    const [open, setOpen] = useState(openMenu);
    const containerRef = useRef(null);

    const handleClose = (): void => {
        setOpen(false);
        handleOpenMenu(false);
    };

    useEffect((): void => {
        setOpen(openMenu);
    }, [openMenu]);

    return (
        <div>
            <Modal
                ref={containerRef}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Slide container={containerRef.current} direction="left" in={open}>
                    <Box sx={style}>
                        <div className="absolute right-4 top-4">
                            <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={handleClose} iconSize={24} />
                        </div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
}
