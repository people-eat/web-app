import { type ReactElement } from 'react';
import PEModal, { type PEModalProps } from '../modal/PEModal';

export default function PEMobileMenu({ openMenu, handleOpenMenu }: PEModalProps): ReactElement {
    return <PEModal openMenu={openMenu} handleOpenMenu={handleOpenMenu} />;
}
