import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEMealCardProps } from './PEMealCardProps';

export default function PEMealCard({ onClick, title, description, imageUrl, active }: PEMealCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex min-w-[340px] box-border w-full max-w-[410px] md:max-w-[710px] max-h-[144px] gap-3 flex-row p-3 rounded-3 shadow-primary cursor-pointer active:shadow-orange',
                {
                    ['shadow-orange']: active,
                    ['hover:shadow-active']: !active,
                },
            )}
        >
            <div className="flex rounded-3 overflow-hidden min-w-[120px] h-[120px] justify-center items-center bg-base">
                {imageUrl ? (
                    <Image
                        style={{ objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrl}
                        alt={imageUrl}
                        width={120}
                        height={120}
                    />
                ) : (
                    <PEIcon icon={Icon.food} edgeLength={52} />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-text-sm-bold text-preBlack">{title}</span>
                <span className="text-text-s text-preBlack line-clamp-6">{description}</span>
            </div>
        </div>
    );
}
