export interface PEFavoriteProps {
    isFavorite: boolean;
    onIsFavoriteChange: (changedIsFavorite: boolean) => void;
    disabled?: boolean;
}
