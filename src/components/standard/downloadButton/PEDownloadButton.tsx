import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PEDownloadButtonProps } from './PEDownloadButtonProps';

export default function PEDownloadButton({ disabled, title, downloadSize, onClick }: PEDownloadButtonProps): ReactElement {
    const className = classNames(
        'max-w-[400px] box-border hover:opacity-70 cursor-pointer border border-solid rounded-3 border-border flex flex-row gap-3 items-center justify-between pr-4 pl-2 py-2',
        { ['opacity-50 hover:opacity-50']: disabled },
    );

    return (
        <section className={className} onClick={onClick}>
            <section className="flex flex-row justify-start items-center gap-2 relative">
                <section className="flex items-start h-8">
                    <PEIcon icon={Icon.file} edgeLength={16} />
                </section>
                <section className="flex flex-col">
                    <span className="text-text-sm">{title}</span>
                    <span className="text-disabled text-text-s">{downloadSize}</span>
                </section>
            </section>
            {disabled ? <PEIcon icon={Icon.download} /> : <PEIcon icon={Icon.downloadOrange} />}
        </section>
    );
}
