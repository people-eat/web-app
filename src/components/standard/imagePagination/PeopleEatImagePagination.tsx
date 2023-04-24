import { type ReactElement } from 'react';

export interface PeopleEatImagePaginationProps {
    index: number;
    length: number;
}

export default function PeopleEatImagePagination({ index, length }: PeopleEatImagePaginationProps): ReactElement {
    return (
        <div className="px-4 py-2 rounded-4 text-white text-text-s bg-pagination max-w-full w-6 whitespace-nowrap">
            {index} / {length}
        </div>
    );
}
