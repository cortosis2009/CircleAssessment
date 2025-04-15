export const CURRENCIES = ['BTC', 'GBP', 'EUR', 'JPY', 'USD'] as const
export type Currencies = (typeof CURRENCIES)[number]
