import classNames from 'classnames';
import { type ReactElement } from 'react';

export default function PESearchTab({
    tab,
    activeTab,
    setActiveTab,
    className,
    children,
}: {
    tab: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    className?: string;
    children: JSX.Element | string;
}): ReactElement {
    return (
        <div
            onClick={(): void => setActiveTab(tab)}
            className={classNames(
                'relative flex flex-col w-[190px] rounded-12 h-full justify-center items-center cursor-pointer before:bg-white',
                'before:block before:absolute before:content-[""] before:z-[-1] before:top-0 before:h-full before:w-[194px]',
                'after:content-[""] hover:after:bg-base after:rounded-12 after:top-0 after:h-full after:w-[190px] after:block after:absolute',
                className,
                {
                    ['hover:before:z-[0]']: activeTab !== tab,
                    ['after:z-[2]']: activeTab !== tab,
                    ['hover:bg-white before:z-[0] after:z-10 after:border after:border-orange after:border-solid after:bg-white hover:after:bg-white']:
                        activeTab === tab,
                },
            )}
        >
            <div className="flex flex-col absolute z-20 max-w-[80%]">
                <span className={'text-text-s text-preBlack'}>{tab}</span>
                <span className={'text-text-m text-black mt-1'}>{children}</span>
            </div>
        </div>
    );
}
