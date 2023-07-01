export interface MockPublicMenu {
    title: string;
    description: string;
    categories: { categoryId: string; title: string }[];
    kitchen?: string;
    cook: {
        user: {
            firstName: string;
            profilePictureUrl?: string;
        };
    };
    pictures: string[];
    price: number;
}

export const mockPublicMenus: MockPublicMenu[] = [
    {
        title: 'Fine-Dining Zuhause',
        description:
            'Carpaccio von der bayrischen Garnelle | Creme Brulee von Ziegenkäse | Zwiebelrostbraten Sous Vide | Zweierlei Wild aus heimischer Jagd | Crème Brûlée | Apfelstrudel 2021',
        categories: [
            { categoryId: 'A', title: 'Bio' },
            { categoryId: 'B', title: 'Glütenfrei' },
        ],
        cook: {
            user: {
                firstName: 'Christopher',
                profilePictureUrl: '/menus/christopher.jpeg',
            },
        },
        pictures: [
            '/menus/menu-01.jpeg',
            '/menus/menu-02.jpeg',
            '/menus/menu-03.jpeg',
            '/menus/menu-04.jpeg',
            '/menus/menu-05.jpeg',
            '/menus/menu-06.jpeg',
        ],
        price: 10500,
    },
    {
        title: 'Alltime Favorite',
        description:
            'Creme Brulee von Monheimer Bio-Ziegenkäse | Speck-Chip | Alblinsen | Wasserkresse\nVegan Wellington | Rotwein-Linsen-Soße | Blumenkohl 3.0\nHimbeer-Joghurt-Törtchen | Minzbiskuit | Beeren | Mocca-Sauce',
        categories: [
            { categoryId: 'A', title: 'Bio' },
            { categoryId: 'B', title: 'Vegetarisch' },
            { categoryId: 'C', title: 'Vegan' },
        ],
        cook: {
            user: {
                firstName: 'Carl',
                profilePictureUrl: '/menus/Carl.jpeg',
            },
        },
        pictures: [
            '/menus/menu-007.jpeg',
            '/menus/menu-008.jpeg',
            '/menus/menu-009.jpeg',
            '/menus/menu-010.jpeg',
            '/menus/menu-011.jpeg',
            '/menus/menu-012.jpeg',
        ],
        price: 9500,
    },
    {
        title: 'Diner mit Freunden',
        description:
            'Gin -Lachs mit Tonic-Gurke | Auberginenröllchen mit Süßkartoffel | Schweinefilet in Iberico-Schinken | Glasierte Lachsforelle auf Kürbis | Pfirsich, Pinienhonig, Lavendeleis | American Cheesecake mit Bromberröster und Karamelsauce',
        categories: [
            { categoryId: 'A', title: 'Vegetarisch' },
            { categoryId: 'B', title: 'Glütenfrei' },
        ],
        cook: {
            user: {
                firstName: 'Uta',
                profilePictureUrl: '/menus/uta.jpeg',
            },
        },
        pictures: [
            '/menus/menu-13.jpeg',
            '/menus/menu-14.jpeg',
            '/menus/menu-15.jpeg',
            '/menus/menu-16.jpeg',
            '/menus/menu-17.jpeg',
            '/menus/menu-18.jpeg',
        ],
        price: 7000,
    },
    {
        title: 'Momentaufnahme Frühling 23',
        description:
            'Lachsforelle I süß saures Gemüse I Buttermilch I 7 Kräuter, Temperiertes Eigelb I Spargel I Kartoffel, Kalb I Sellerie I Molke, Iberico Secreto I Röstgemüse I schwarzem Knoblauch, Erdbeere I Schokolade  I Quinoa, Rhabarber & Hafer',
        categories: [],
        cook: {
            user: {
                firstName: 'Robert',
                profilePictureUrl: '/menus/Robert.jpeg',
            },
        },
        pictures: ['/menus/menu-19.jpeg', '/menus/menu-20.jpeg'],
        price: 9200,
    },
    {
        title: 'Veganer Abend mit Freunden',
        description:
            'Pastinaken Schwarzwurzel Suppe I Schwarzwurzeln mit Orangen-Senf Soße I Mangold-Rouladen mit Maronenfüllung I Quiche I Saftige warme Kürbis-Muffins mit Vanilleeis I Süße Maronen Creme mit Keksboden',
        categories: [
            { categoryId: 'A', title: 'Vegan' },
            { categoryId: 'B', title: 'Vegetarisch' },
            { categoryId: 'C', title: 'Lactosefrei' },
            { categoryId: 'D', title: 'Glutenfrei' },
            { categoryId: 'E', title: 'Bio' },
        ],
        cook: {
            user: {
                firstName: 'Nadine',
                profilePictureUrl: '/menus/Nadine.png',
            },
        },
        pictures: [
            '/menus/menu-21.jpeg',
            '/menus/menu-22.jpeg',
            '/menus/menu-23.jpeg',
            '/menus/menu-24.jpeg',
            '/menus/menu-25.jpeg',
            '/menus/menu-26.jpeg',
        ],
        price: 8700,
    },
];
