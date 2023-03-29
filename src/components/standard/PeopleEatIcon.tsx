export enum Icons {
    apple = '/apple.svg',
    arrowNarrowRight = '/arrow-narrow-right.svg',
    arrowRight = 'arrow-right.svg',
    arrowReload = '/arrow-reload.svg',
    barChart = '/bar-chart.svg',
    camera = '/camera.svg',
    chatDots = '/chat-dots.svg',
    check = '/check.svg',
    close = '/close.svg',
    coinsHand = '/coins-hand.svg',
    creditCard = '/credit-card.svg',
    data = '/data.svg',
    download = '/download.svg',
    editPencil = '/edit-pencil.svg',
    facebook = '/facebook.svg',
    file = '/file.svg',
    fileSearch = '/file-search.svg',
    filterLines = '/filterLines.svg',
    folder = '/folder.svg',
    forward = '/forward.svg',
    google = '/google.svg',
    heart = '/heart.svg',
    home = '/hove.svg',
    list = '/list.svg',
    markerPin = '/marker-pin.svg',
    messageChat = '/message-chat-circle.svg',
    minus = '/minus.svg',
    moreApps = '/more-apps.svg',
    navigations = '/navigation.svg',
    play = '/play.svg',
    plus = '/plus.svg',
    profileEmpty = '/profile-empty.svg',
    search = '/search.svg',
    settings = '/settings.svg',
    shieldCheck = '/shield-check.svg',
    star = '/star.svg',
    userCardId = '/user-card-ID.svg',
    users = '/users.svg',
    usersOrange = '/users-orange.svg',
}

type Props = {
    icon?: Icons;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const PeopleEatIcon = ({ icon }: Props) => {
    return (
        <div>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <img src={icon} alt="people eat icon component" />
        </div>
    );
};
