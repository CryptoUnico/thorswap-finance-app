// https://docs.thorchain.org/how-it-works/governance#mimir

import { useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { Amount } from 'multichain-sdk'

import { useMidgard } from 'redux/midgard/hooks'

export const useMimir = () => {
  const dispatch = useDispatch()
  const { actions, networkData, mimir } = useMidgard()

  useEffect(() => {
    dispatch(actions.getNetworkData())
    dispatch(actions.getMimir())
  }, [dispatch, actions])

  const maxLiquidityRuneMimir = mimir?.['mimir//MAXIMUMLIQUIDITYRUNE']
  const maxLiquidityRune = Amount.fromMidgard(maxLiquidityRuneMimir)
  const totalPooledRune = Amount.fromMidgard(networkData?.totalPooledRune)

  const isFundsCapReached: boolean = useMemo(() => {
    if (!maxLiquidityRuneMimir) return false

    // totalPooledRune >= 90% of maxLiquidityRune
    return maxLiquidityRune.mul(0.9).lte(totalPooledRune)
  }, [totalPooledRune, maxLiquidityRune, maxLiquidityRuneMimir])

  return {
    maxLiquidityRune,
    isFundsCapReached,
  }
}
