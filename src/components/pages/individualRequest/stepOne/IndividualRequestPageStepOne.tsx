import { DatePicker, TimePicker } from '@mui/x-date-pickers';
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
    time: Moment;
    setTime: (changedDate: Moment) => void;
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
    date,
    setDate,
    time,
    setTime,
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
            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Participants</h3>
                <HStack className="w-full lg:items-center lg:my-4">
                    <span>Adults</span>
                    <Spacer />
                    <PECounter value={adultCount} onValueChange={setAdultCount} />
                </HStack>
                <HStack className="w-full lg:items-center">
                    <span>Children</span>
                    <Spacer />
                    <PECounter value={childrenCount} onValueChange={setChildrenCount} />
                </HStack>
            </VStack>

            <VStack gap={16} className="w-full relative" style={{ alignItems: 'flex-start' }}>
                <h3>Event details</h3>
                <HStack gap={16} className="w-full box-border relative">
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-solid border-disabled rounded-4 px-4  py-2 box-border">
                        <DatePicker
                            sx={{ width: '100%' }}
                            value={date}
                            onChange={(changedDate: Moment | null): void => {
                                if (changedDate) setDate(changedDate);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={'Date'}
                            disablePast
                        />
                    </div>
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-solid border-disabled rounded-4 px-4  py-2 box-border">
                        <TimePicker
                            sx={{ width: '100%' }}
                            value={time}
                            onChange={(changedTime: Moment | null): void => {
                                if (changedTime) setTime(changedTime);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={'Time'}
                            disablePast
                        />
                    </div>
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
