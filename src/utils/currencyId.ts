import { Currency, ETHER, Token, ChainId } from 'dtcswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) {
    if (currency.chainId === ChainId.DTC) {
      return 'DTT'
    }
    return 'ETH'
  }
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
