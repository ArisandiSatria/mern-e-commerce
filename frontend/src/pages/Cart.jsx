import React from 'react'
import { useRecoilValue } from 'recoil'
import { userOrder } from '../state/selector/orderUser'

const Cart = () => {
  const order = useRecoilValue(userOrder)
  return (
    <div>length: {order.name}</div>
  )
}

export default Cart