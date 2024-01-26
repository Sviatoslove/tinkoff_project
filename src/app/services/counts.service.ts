import { ICount } from '../../models';

export function countCreate(payload: ICount | string) {
  return new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(payload);
    }, 1000);
  });
}
