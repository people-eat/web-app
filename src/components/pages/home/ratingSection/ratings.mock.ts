import { type CookRank } from '../../../../data-source/generated/graphql';

export interface MockPublicRating {
    customerName: string;
    chefName: string;
    rank?: CookRank;
    rating: string;
    comment: string;
    created: string;
}

export const mockPublicRatings: MockPublicRating[] = [
    {
        customerName: 'Felix, München',
        chefName: 'Christopher',
        rank: 'PROFESSIONAL',
        rating: '5.0',
        comment: 'Wir hatten einen hervorragenden Abend mit Chris, schwer zu toppen, was und mit welcher Hingabe er für uns gezaubert hat!',
        created: 'März, 2023',
    },
    {
        customerName: 'Nico, München',
        chefName: 'Uta',
        rank: 'HOBBY',
        rating: '5.0',
        comment:
            'Unsere Köchin Uta hat uns ein 3-Gänge-Menü vom feinsten gezaubert, und ließ sich auch nicht durch unsere Fragen und Kommentare beim Kochen aus der Ruhe bringen. Das Essen hat toll geschmeckt, es war ein relaxter Abend und wir können es nur weiterempfehlen!!',
        created: 'Dezember, 2022',
    },
    {
        customerName: 'Paulina, München',
        chefName: 'PeopleEat',
        rank: undefined,
        rating: '4.9',
        comment:
            'Ich war auf der Suche nach einem Geburtstagsgeschenk und wurde hier schnell fündig. Meine Gutschein-Wünsche wurden berücksichtigt; der Kontakt war sehr freundlich! Ich freue mich schon auf das Abendessen!',
        created: 'Januar, 2023',
    },
];
