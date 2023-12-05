import {selector} from 'recoil'
import { userState } from '../atom/userState';

export const userIsLoggedIn= selector({
  key: 'userIsLoggedIn', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const user = get(userState);

    return user;
  },
});