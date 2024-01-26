import { createContext, useContext, useEffect, useState } from 'react';
import { IOperation } from '../../models';
import { selectCategories, selectOperations } from '../store/operationsSlice';
import { useAppSelector } from '../hooks/hooks';
import { IFormsProviderProps } from '../components/common/form/formSettings';

export interface IDataForChart {
  name:string,
  value: string,
  bgColor:string,
  categoryId:string,
}

export interface IDataAnalytics {
  filteredOperations?:IOperation[]|undefined;
  getCategoriesBalances:(view:string)=>  IDataForChart[];
  getIncomeExpenses:() =>  IDataForChart[];
  handleDivideCategories: (categoryId: string) => void;
}

const defaultState = {
  filteredOperations:[],
  getCategoriesBalances:(view:string) => [],
  getIncomeExpenses:() => [],
  handleDivideCategories: (categoryId: string) => {}
};

const AnalyticsContext = createContext<IDataAnalytics>(defaultState);

const useAnalytics = () => useContext(AnalyticsContext);


const AnalyticsProvider = ({ children }: IFormsProviderProps) => {
  const operations: any = useAppSelector(selectOperations());
  const [searchCategory, setSearchCategory] = useState<string>()
  const categories: any = useAppSelector(selectCategories());

  const getCategoriesBalances = (view:string) => {
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
          value: !view
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

    const handleDivideCategories = (categoryId: string) => {
      setSearchCategory(categoryId)
    };

  return (
    <AnalyticsContext.Provider
      value={{
        getCategoriesBalances,
        getIncomeExpenses,
        handleDivideCategories
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export { useAnalytics,
  AnalyticsProvider};

