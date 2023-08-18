import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import PEButton from '../buttons/PEButton';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import PEMultiLineTextField from '../textFields/PEMultiLineTextField';

const reviewsFields = ['Quelitat des Essens', 'Kommunikation', 'Wie beaurteilen Sie die Qualitat der Reiniging', 'Service'];
// there are missing props because I wasn't sure what they need to contain, should only signedInUser and setOpen or to have something more
const PEReviewCardUser = (): JSX.Element => {
    const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0]);
    const [comment, setComment] = useState<string>('');

    const handleRatingChange = (index: number, rating: number): void => {
        const newRatings = [...ratings];
        newRatings[index] = rating;
        setRatings(newRatings);
    };

    const handleCommentChange = (newComment: string): void => {
        setComment(newComment);
    };

    const handleReviewSubmit = (): void => {
        / *adding reviews to db* /;
        setRatings([0, 0, 0, 0]);
    };

    return (
        <VStack
            className="relative bg-white shadow-primary gap-4 p-4 rounded-5 lg:w-4/5 xl:w-3/4 lg:max-h-full mx-auto"
            style={{ alignItems: 'start' }}
        >
            <h2 className="text-orange underline text-lg lg:text-xl xl:text-2xl">User Name</h2>
            {reviewsFields.map((category, index) => (
                <VStack key={category} style={{ alignItems: 'flex-start' }}>
                    <h3 className="text-base lg:text-lg xl:text-xl">{category}</h3>
                    <HStack>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} onClick={(): void => handleRatingChange(index, star)}>
                                <PEIcon
                                    icon={star <= (ratings[index] || 0) ? Icon.star : Icon.greyStar ?? undefined}
                                    edgeLength={20}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}
                    </HStack>
                </VStack>
            ))}
            <VStack style={{ width: '100%', alignItems: 'start' }}>
                <h3 className="text-base lg:text-lg xl:text-xl">Kommentar</h3>
                <PEMultiLineTextField value={comment} onChange={handleCommentChange} placeholder="Kommentar" />
            </VStack>
            <HStack>
                <PEButton title="Bewerbung senden" onClick={handleReviewSubmit} className="text-lg lg:text-xl xl:text-2xl" />
            </HStack>
            <div
                onClick={(): void => {
                    / *close popup* /;
                }}
            >
                <PEIcon icon={Icon.close} edgeLength={30} className="absolute top-4 right-4 cursor-pointer" />
            </div>
        </VStack>
    );
};

export default PEReviewCardUser;
