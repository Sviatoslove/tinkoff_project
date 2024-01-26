import { IUser } from '../../models';

export function userCreate(payload: IUser) {
  return new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(payload);
    }, 1000);
  });
}
