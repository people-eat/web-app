import { type Moment } from 'moment';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PECounter from '../../../standard/counter/PECounter';
import PEInput from '../../../standard/input/PEInput';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepOneProps {
    adultCount: number;
    setAdultCount: (changedAdultCount: number) => void;
    childrenCount: number;
    setChildrenCount: (changeChildrenCount: number) => void;
    addressSearchText: string;
    setAddressSearchText: (changedAddressSearchText: string) => void;
    date: Moment;
    setDate: (changedDate: Moment) => void;
    occasion: string;
    setOccasion: (changedOccasion: string) => void;
    budget: string;
    setBudget: (changedBudget: string) => void;
    message: string;
    setMessage: (changedMessage: string) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStepOne({
    adultCount,
    setAdultCount,
    childrenCount,
    setChildrenCount,
    addressSearchText,
    setAddressSearchText,
    // date,
    // setDate,
    occasion,
    setOccasion,
    budget,
    setBudget,
    message,
    setMessage,
    onContinue,
}: IndividualRequestPageStepOneProps): ReactElement {
    return (
        <>
            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Participants</h3>
                <HStack className="w-full">
                    <span>Adults</span>
                    <Spacer />
                    <PECounter value={adultCount} onValueChange={setAdultCount} />
                </HStack>
                <HStack className="w-full">
                    <span>Children</span>
                    <Spacer />
                    <PECounter value={childrenCount} onValueChange={setChildrenCount} />
                </HStack>
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Event details</h3>
                <HStack gap={4} className="w-full">
                    <PEInput value={''} onChange={(): void => undefined} type="text" placeholder="Date" />
                    <PEInput value={''} onChange={(): void => undefined} type="text" placeholder="Time" />
                </HStack>
                <PEInput value={occasion} onChange={setOccasion} type="text" placeholder="Occasion" />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Event location</h3>
                <PEInput value={addressSearchText} onChange={setAddressSearchText} type="text" placeholder="Location" />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Budget</h3>
                <PEInput value={budget} onChange={setBudget} type="text" placeholder="Budget" />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Message</h3>
                <PEMultiLineTextField value={message} onChange={setMessage} placeholder="Message" />
            </VStack>

            <PEButton onClick={onContinue} title="Continue" />
        </>
    );
}
