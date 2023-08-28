import { Divider } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PEMobileChatCardProps {
    bookingRequest: {
        bookingRequestId: string;
        price: {
            amount: number;
            currencyCode: string;
        };
        status: string;
        dateTime: Date;
        cook: {
            user: {
                firstName: string;
                profilePictureUrl: string;
            };
        };
        configuredMenu: {
            title?: string;
        };
    };
    onClick?: () => void;
}

const PEMobileChatCard = ({ bookingRequest, onClick }: PEMobileChatCardProps): JSX.Element => {
    return (
        <VStack
            gap={16}
            className="w-full"
            style={{ alignItems: 'flex-start', borderBottom: '3px solid #f5f5f5', marginBottom: '1.5rem' }}
            onClick={onClick}
        >
            <HStack className="w-full">
                {bookingRequest.status === 'OPEN' && (
                    <span className="text-green" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                        Open
                    </span>
                )}
                {bookingRequest.status === 'PENDING' && (
                    <span className="text-blue-400" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                        Pending
                    </span>
                )}
                {bookingRequest.status === 'CANCELED' && (
                    <span className="text-red-400" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                        Canceled
                    </span>
                )}
                {bookingRequest.status === 'COMPLETED' && (
                    <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>Completed</span>
                )}
                <Spacer />
                <span className="text-green">
                    {bookingRequest.price.amount} {bookingRequest.price.currencyCode}
                </span>
            </HStack>
            {bookingRequest?.configuredMenu?.title}
            <HStack gap={16} className="text-gray">
                {moment(bookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                <Divider orientation="vertical" flexItem style={{ display: 'inline' }}></Divider>
                {moment(bookingRequest.dateTime).format('LT')}
            </HStack>
            <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                {bookingRequest.cook.user.profilePictureUrl && (
                    <Image
                        className="rounded-3"
                        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        src={bookingRequest.cook.user.profilePictureUrl}
                        alt={'client image'}
                        width={45}
                        height={45}
                    />
                )}
                {!bookingRequest.cook.user.profilePictureUrl && (
                    <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                        <PEIcon icon={Icon.profileLight} edgeLength={32} />
                    </div>
                )}
                {bookingRequest.cook.user.firstName}
                <Spacer />
                in {moment(bookingRequest.dateTime).diff(moment(), 'days')} days
            </HStack>
            <Divider key={bookingRequest.bookingRequestId + 'divider'} />
        </VStack>
    );
};
export default PEMobileChatCard;
