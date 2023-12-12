import {selector} from 'recoil'
import { orderState } from '../atom/orderState';

export const userOrder= selector({
  key: 'userOrder', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const order = get(orderState);

    return order;
  },
});