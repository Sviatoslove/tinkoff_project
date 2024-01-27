import { createContext, useContext, useState } from 'react';
import { ICategories, IOperation } from '../../models';
import { useAppSelector } from '../hooks/hooks';
import { selectOperations } from '../store/operationsSlice';
import { IFormsProviderProps } from '../components/common/form/formSettings';

interface IFiltersContext {
  searchCategory:string|undefined
  dates: (string | ICategories)[] | undefined;
  filteredOperations: IOperation[] | undefined;
  handleDividerCategory: (x: string) => void;
}

const defaultState = {
  dates: [],
  searchCategory:'',
  filteredOperations: [],
  handleDividerCategory: () => {},
};

const FiltersContext = createContext<IFiltersContext>(defaultState);

const useFilters = () => useContext(FiltersContext);

const FiltersProvider = ({ children }: IFormsProviderProps) => {
  const [searchCategory, setSearchCategory] = useState<string>();
  const setDates = new Set()

  const operations = useAppSelector(selectOperations());

  const filteredOperations: IOperation[] | undefined = operations?.filter(
    ({ category }) => searchCategory ? category === searchCategory : category
    );
    
  filteredOperations?.forEach(({ date }) => setDates.add(date));

  const data: any = Array.from(setDates)
  const dates: any = data.toSorted().reverse()

  const handleDividerCategory = (id: string)=>{
    if(searchCategory!==id){
      setSearchCategory(id)
    }else setSearchCategory('')
  }

  return (
    <FiltersContext.Provider
      value={{
        dates,
        filteredOperations,
        handleDividerCategory,
        searchCategory
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { useFilters, FiltersProvider };
