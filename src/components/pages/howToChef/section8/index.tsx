import { type ReactElement } from 'react';
import PEExpandable from '../../../standard/expandable/PEExpandable';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { expand01, expandDescription01 } from '../translations.mock';

export default function HowToChefSection8(): ReactElement {
    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[120px] mb-15">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        FAQ
                    </h2>
                </div>
                <HStack className="w-full flex-wrap gap-5">
                    <PEExpandable title={expand01} description={expandDescription01} />
                    <PEExpandable title={expand01} description={expandDescription01} />
                    <PEExpandable title={expand01} description={expandDescription01} />
                    <PEExpandable title={expand01} description={expandDescription01} />
                    <PEExpandable title={expand01} description={expandDescription01} />
                </HStack>
            </VStack>
        </VStack>
    );
}
