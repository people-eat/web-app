import { type Price } from '../data-source/generated/graphql';

export const formatPrice = (price: Price): string => (price.amount / 100).toFixed(2) + ' ' + price.currencyCode;
