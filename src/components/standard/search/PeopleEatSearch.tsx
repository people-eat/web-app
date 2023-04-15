import { Input } from '@mui/material';
import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PeopleEatIcon';

const SEARCH_TABS = ['Your city', 'Number of persons', 'Children', 'Date'];

export default function PeopleEatSearch(): ReactElement {
    const temporary = 'absolute left-[50vw] translate-x-[-50%]';
    const [activeTab, setActiveTab] = useState('');

    function validateString(value: string): string {
        return value.length > 20 ? value.slice(0, 17) + '...' : value;
    }

    return (
        <div
            className={classNames(
                'flex flex-row items-center relative w-[820px] max-w-[820px] h-[73px] bg-white shadow-primary rounded-12',
                temporary,
            )}
        >
            {SEARCH_TABS.map((tab, index, array) => (
                <>
                    <div
                        onClick={(): void => setActiveTab(tab)}
                        className={classNames(
                            'relative flex flex-col w-[190px] rounded-12 h-full justify-center items-center cursor-pointer before:bg-white',
                            'before:block before:absolute before:content-[""] before:z-[-1] before:top-0 before:h-full before:w-[194px]',
                            'after:content-[""] hover:after:bg-base after:rounded-12 after:top-0 after:h-full after:w-[190px] after:block after:absolute',
                            {
                                ['hover:before:z-[0]']: activeTab !== tab,
                                ['after:z-[2]']: activeTab !== tab,
                                ['after:pl-1 before:rounded-l-12 after:rounded-l-12']: index === 0,
                                ['pr-12 after:pr-[57px] after:-right-2']: index === array.length - 1,
                                ['hover:bg-white before:z-[0] after:z-10 after:shadow-primary after:bg-white hover:after:bg-white']:
                                    activeTab === tab,
                            },
                        )}
                    >
                        <div className="flex flex-col absolute z-20 max-w-[80%]">
                            <span className={'text-text-s text-preBlack'}>{tab}</span>
                            <span className={'text-text-m text-black mt-1'}>
                                {activeTab === tab ? (
                                    <Input sx={{ boxSizing: 'border-box', maxHeight: '20px' }} value={'Rome, Italy.Rome, Italy'} />
                                ) : (
                                    validateString('Rome, Italy.Rome, Italy')
                                )}
                            </span>
                        </div>
                    </div>
                    {index !== array.length - 1 ? <span className="w-[2px] h-[calc(100%-24px)] bg-separator rounded-1" /> : null}
                </>
            ))}
            <div className={'w-[53px] h-[53px] right-3 absolute z-10 cursor-pointer bg-orange rounded-10 flex justify-center items-center'}>
                <PeopleEatIcon icon={Icon.search} className={'invert-0'} />
            </div>
        </div>
    );
}
