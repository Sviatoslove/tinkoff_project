import { IOperation } from '../../models';

export function operationCreate(payload: IOperation) {
  return new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(payload);
    }, 1000);
  }) 
}

export function operationUpdate(payload: IOperation) {
  return new Promise((resolve: any) => {
    window.setTimeout(function () {
      resolve(payload);
    }, 1000);
  });
}

export function operationDelete(payload: IOperation) {
  return new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(payload);
    }, 1000);
  });
}
