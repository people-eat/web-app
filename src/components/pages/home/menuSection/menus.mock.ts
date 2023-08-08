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
                profilePictureUrl: '/menus/Privatkoch-Christopher.jpeg',
            },
        },
        pictures: [
            '/menus/Zwiebelrostbraten-fine-dining.jpeg',
            '/menus/Zweierlei-wild-fine-dining.jpeg',
            '/menus/Garnelen-carpaccio.jpeg',
            '/menus/Ziegenkaese-Creme-Brulee.jpeg',
            '/menus/Creme-brulee.jpeg',
            '/menus/Apfelstrudel.jpeg',
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
                profilePictureUrl: '/menus/Privatkoch-Carl.jpeg',
            },
        },
        pictures: [
            '/menus/Garnelen-fine-dining.jpeg',
            '/menus/Truffel-fine-dining.jpeg',
            '/menus/Wellington.jpeg',
            '/menus/Rindsteak.jpeg',
            '/menus/Creme-brulee-ziegenkaese.jpeg',
            '/menus/Fine-dining-dessert.jpeg',
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
            '/menus/rindsteak-fine-dining.jpeg',
            '/menus/Gin-Lachs.jpeg',
            '/menus/auberginen-mit-suesskartoffel.jpeg',
            '/menus/cheesecake-himbeeren.jpeg',
            '/menus/glasierte-lachsforelle.jpeg',
            '/menus/cheesecake.jpeg',
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
        pictures: ['/menus/lachs-mit-gemuese.jpeg', '/menus/iberico-secreto.jpeg'],
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
            '/menus/quiche.jpeg',
            '/menus/spargel.jpeg',
            '/menus/pastinaken-suppe.jpeg',
            '/menus/mangold-rouladen.jpeg',
            '/menus/kuerbis-muffins.jpeg',
            '/menus/maronen-creme.jpeg',
        ],
        price: 8700,
    },
];
