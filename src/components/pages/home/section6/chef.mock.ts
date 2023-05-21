export interface MockPublicChef {
    chefName: string;
    menuTitle: string;
    description: string;
    categories: string;
    kitchens?: string;
    chefPicture: string;
    pictures: string[];
    price: number;
}

export const headline = 'Meistgesuchte Menüs';

export const mockPublicChefs: MockPublicChef[] = [
    {
        chefName: 'Christopher',
        menuTitle: 'Fine-Dining Zuhause',
        description:
            'Carpaccio von der bayrischen Garnelle | Creme Brulee von Ziegenkäse | Zwiebelrostbraten Sous Vide | Zweierlei Wild aus heimischer Jagd | Crème Brûlée | Apfelstrudel 2021',
        categories: 'Bio, Glütenfrei',
        chefPicture: '/menus/christopher.jpeg',
        pictures: [
            '/menus/menu-01.jpeg',
            '/menus/menu-02.jpeg',
            '/menus/menu-03.jpeg',
            '/menus/menu-04.jpeg',
            '/menus/menu-05.jpeg',
            '/menus/menu-06.jpeg',
        ],
        price: 105,
    },
    {
        chefName: 'Carl',
        menuTitle: 'Alltime Favorite',
        description:
            'Creme Brulee von Monheimer Bio-Ziegenkäse | Speck-Chip | Alblinsen | Wasserkresse\nVegan Wellington | Rotwein-Linsen-Soße | Blumenkohl 3.0\nHimbeer-Joghurt-Törtchen | Minzbiskuit | Beeren | Mocca-Sauce',
        categories: 'Bio, vegetarisch, vegan',
        chefPicture: '/menus/Carl.jpeg',
        pictures: [
            '/menus/menu-007.jpeg',
            '/menus/menu-008.jpeg',
            '/menus/menu-009.jpeg',
            '/menus/menu-010.jpeg',
            '/menus/menu-011.jpeg',
            '/menus/menu-012.jpeg',
        ],
        price: 95,
    },
    {
        chefName: 'Uta',
        menuTitle: 'Diner mit Freunden',
        description:
            'Gin -Lachs mit Tonic-Gurke | Auberginenröllchen mit Süßkartoffel | Schweinefilet in Iberico-Schinken | Glasierte Lachsforelle auf Kürbis | Pfirsich, Pinienhonig, Lavendeleis | American Cheesecake mit Bromberröster und Karamelsauce',
        categories: 'Vegetarisch, Glutenfrei',
        chefPicture: '/menus/uta.jpeg',
        pictures: [
            '/menus/menu-13.jpeg',
            '/menus/menu-14.jpeg',
            '/menus/menu-15.jpeg',
            '/menus/menu-16.jpeg',
            '/menus/menu-17.jpeg',
            '/menus/menu-18.jpeg',
        ],
        price: 70,
    },
    {
        chefName: 'Robert',
        menuTitle: 'Momentaufnahme Frühling 23',
        description:
            'Lachsforelle I süß saures Gemüse I Buttermilch I 7 Kräuter, Temperiertes Eigelb I Spargel I Kartoffel, Kalb I Sellerie I Molke, Iberico Secreto I Röstgemüse I schwarzem Knoblauch, Erdbeere I Schokolade  I Quinoa, Rhabarber & Hafer',
        categories: '',
        chefPicture: '/menus/Robert.jpeg',
        pictures: ['/menus/menu-19.jpeg', '/menus/menu-20.jpeg'],
        price: 92,
    },
    {
        chefName: 'Nadine',
        menuTitle: 'Veganer Abend mit Freunden',
        description:
            'Pastinaken Schwarzwurzel Suppe I Schwarzwurzeln mit Orangen-Senf Soße I Mangold-Rouladen mit Maronenfüllung I Quiche I Saftige warme Kürbis-Muffins mit Vanilleeis I Süße Maronen Creme mit Keksboden',
        categories: 'Vegan, Vegetarisch, Lactosefrei, Glutenfrei, Bio',
        chefPicture: '/menus/Nadine.png',
        pictures: [
            '/menus/menu-21.jpeg',
            '/menus/menu-22.jpeg',
            '/menus/menu-23.jpeg',
            '/menus/menu-24.jpeg',
            '/menus/menu-25.jpeg',
            '/menus/menu-26.jpeg',
        ],
        price: 87,
    },
];
