import { selectCategories, selectOperations } from '../store/operationsSlice';
import { useAppSelector } from './hooks';

export interface IDataForChart {
  name:string,
  value: string,
  bgColor:string,
  categoryId:string,
}

export const useAnalytics = (view?:string): IDataForChart[] => {
  const operations: any = useAppSelector(selectOperations());
  const categories: any = useAppSelector(selectCategories());

  const getCategoriesBalances = () => {
    return categories?.reduce((acc: any, category: any) => {
      let totalBalanceDec = 0;
      let totalBalanceInc = 0;
      let incr = category.name === 'Пополнение счёта' && true;
      operations?.forEach((operation: any) => {
        if (category.id === operation.category) {
          if (operation.dataType === 'operations') {
            totalBalanceDec += +operation.balance;
          } else {
            totalBalanceInc += +operation.balance;
          }
        }
      });

      return (acc = [
        ...acc,
        {
          name: category.name,
          value: view
            ? incr
              ? totalBalanceInc
              : totalBalanceDec
            : totalBalanceDec,
          bgColor: category.bgColor,
          categoryId: category.id,
        },
      ]);
    }, []);
  };

  const getIncomeExpenses = () => {
    return ['operations', 'topUpCount'].reduce((acc: any, category: any) => {
      let totalBalance = 0;
      let incr = category === 'topUpCount' && true;

      operations?.forEach((operation: any) => {
        if (operation.dataType === category) {
          totalBalance += +operation.balance;
        }
      });

      return (acc = [
        ...acc,
        {
          name: category,
          value: totalBalance,
          bgColor: incr ? 'green' : 'red',
        },
      ]);
    }, []);
  };

  const data = view ? getIncomeExpenses() : getCategoriesBalances()

  return data
}
