import { type ReactElement } from 'react';

export interface PEImagePaginationProps {
    currentIndex: number;
    length: number;
}

export default function PEImagePagination({ currentIndex, length }: PEImagePaginationProps): ReactElement {
    return (
        <div className="px-4 py-2 rounded-4 text-white text-text-s bg-pagination max-w-full w-6 whitespace-nowrap">
            {currentIndex} / {length}
        </div>
    );
}
