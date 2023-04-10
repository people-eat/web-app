import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatDocumentDownloadButtonProps {
    disabled?: boolean;
    title: string;
    downloadSize: string;
}

export default function PeopleEatDocumentDownloadButton({
    disabled,
    title,
    downloadSize,
}: IPeopleEatDocumentDownloadButtonProps): ReactElement {
    const className = classNames(
        'max-w-[400px] box-border hover:opacity-70 cursor-pointer border border-solid rounded-3 border-border flex flex-row gap-3 items-center justify-between pr-4 pl-2 py-2',
        { ['opacity-50 hover:opacity-50']: disabled },
    );

    return (
        <section className={className}>
            <section className="flex flex-row items-center gap-2">
                <PeopleEatIcon icon={Icon.file} />
                <section className="flex flex-col">
                    <span className="text-text-sm">{title}</span>
                    <span className="text-disabled text-text-s">{downloadSize}</span>
                </section>
            </section>
            <PeopleEatIcon icon={Icon.download} />
        </section>
    );
}
