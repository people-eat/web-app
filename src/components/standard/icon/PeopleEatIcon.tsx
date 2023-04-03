import classNames from 'classnames';
import Image from 'next/image';

export enum IconsList {
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

interface PeopleEatIconProps {
    icon: IconsList;
    width?: number;
    height?: number;
    color?: 'white' | 'black';
    Classes?: string;
}

export const PeopleEatIcon = ({ icon, width = 44, height = 44, color = 'black', Classes }: PeopleEatIconProps): JSX.Element => {
    return (
        <div>
            <Image
                className={classNames(Classes, {
                    ['invert']: color === 'white',
                })}
                height={height}
                width={width}
                src={icon}
                alt="PeopleEat icon component"
            />
        </div>
    );
};
