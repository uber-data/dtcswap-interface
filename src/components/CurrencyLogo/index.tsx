import { ChainId, Currency, ETHER, Token } from 'dtcswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import DttLogo from '../../assets/images/dtt-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const getDTCTokenLogoURL = (address: string) =>
  `https://dtc-swap.oss-ap-southeast-1.aliyuncs.com/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        if (currency.chainId === ChainId.DTC) {
          return [...uriLocations, getDTCTokenLogoURL(currency.address)]
        }
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      if (currency.chainId === ChainId.DTC) {
        return [getDTCTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    if (ETHER.chainId === ChainId.DTC) {
      return <StyledEthereumLogo src={DttLogo} size={size} style={style} />
    } else {
      return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
    }
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
