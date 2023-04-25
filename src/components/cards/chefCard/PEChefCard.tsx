import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PEIcon';

export interface PEChefCardProps {
    size?: 's' | 'b';
    image?: string;
    chefName?: string;
    city?: string;
    estimation?: string;
    voices?: string;
    kitchensList?: string[];
    dishesList?: string[];
}

export default function PEChefCard({
    size,
    image,
    chefName,
    city,
    estimation,
    voices,
    kitchensList,
    dishesList,
}: PEChefCardProps): ReactElement {
    const baseClassNames =
        'flex flex-col active:shadow-primary hover:shadow-primary overflow-hidden w-full border-solid border-border border-[1px] rounded-3 cursor-pointer';
    const width = classNames({
        'max-w-[380px]': size !== 's',
        'max-w-[280px]': size === 's',
    });

    return (
        <div className={classNames(baseClassNames, width)}>
            <div>
                {image ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={image}
                        alt={image}
                        width={size !== 's' ? 380 : 280}
                        height={size !== 's' ? 400 : 290}
                    />
                ) : null}
                {!image ? (
                    <div
                        className={classNames('w-full bg-base flex justify-center items-center', {
                            ['h-[400px]']: size !== 's',
                            ['h-[280px]']: size === 's',
                        })}
                    >
                        <PeopleEatIcon edgeLength={110} icon={Icon.profileLight} />
                    </div>
                ) : null}
            </div>
            <div className="flex gap-2 flex-col p-4 box-border">
                <span className="text-heading-m">{chefName}</span>
                <div
                    className={classNames('flex gap-2 justify-between', {
                        ['items-center']: size === 'b',
                        ['flex-col items-start']: size === 's',
                    })}
                >
                    <span className="text-text-m text-preBlack">{chefName}</span>
                    <div className="flex items-center gap-2">
                        {city ? (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PeopleEatIcon icon={Icon.markerPinOrange} edgeLength={20} />
                                <span className="text-preBlack">{city}</span>
                            </div>
                        ) : null}
                        <div className="flex items-center gap-2 flex-row">
                            <PeopleEatIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{estimation}</span>
                            <span className="text-disabled">({voices})</span>
                        </div>
                    </div>
                </div>
                {kitchensList ? (
                    <div className={'overflow-scroll flex flex-row gap-2 mt-3 scrollbar-hide'}>
                        {kitchensList?.map(
                            (kitchen): ReactElement => (
                                <div key={kitchen} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                                    {kitchen}
                                </div>
                            ),
                        )}
                    </div>
                ) : null}
                {dishesList ? (
                    <div className={'overflow-x-scroll items-center flex flex-row gap-2 mt-3 scrollbar-hide'}>
                        <PeopleEatIcon icon={Icon.dishes} />
                        {dishesList?.map(
                            (dish): ReactElement => (
                                <div key={dish} className={'text-orange text-text-s-height '}>
                                    {dish}
                                </div>
                            ),
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
