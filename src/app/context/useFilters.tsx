import { createContext, useContext, useState } from 'react';
import { EventChange, ICategories, IOperation } from '../../models';
import { useAppSelector } from '../hooks/hooks';
import { selectOperations } from '../store/operationsSlice';
import { IFormsProviderProps } from '../components/common/form/formSettings';

interface IFiltersContext {
  searchCategory:string|undefined
  dates: (string | ICategories)[] | undefined;
  filteredOperations: IOperation[] | undefined;
  handleDividerCategory: (x: string) => void;
  handleChangeSearchQuery: (x: EventChange) => void;
}

const defaultState = {
  dates: [],
  searchCategory:'',
  filteredOperations: [],
  handleDividerCategory: () => {},
  handleChangeSearchQuery: () => {},
};

const FiltersContext = createContext<IFiltersContext>(defaultState);

const useFilters = () => useContext(FiltersContext);

const FiltersProvider = ({ children }: IFormsProviderProps) => {
  const [searchCategory, setSearchCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>();
  const setDates = new Set()

  const operations = useAppSelector(selectOperations());

  const filteredOperations: IOperation[] | undefined = operations?.filter(
    ({ category }) => searchCategory ? category === searchCategory : category
    ).filter((operation: any)=> {
      if(searchQuery) {
        const fields = ['date', 'name', 'content', 'balance']
        const search = searchQuery?.trim().toLowerCase()
        for(const field of fields) {
          if(operation[field].toLowerCase().includes(search)) return operation
        }
      }else return operation
    })
    
  filteredOperations?.forEach(({ date }) => setDates.add(date));

  const data: any = Array.from(setDates)
  const dates: any = data.toSorted().reverse()

  const handleDividerCategory = (id: string)=>{
    if(searchCategory!==id){
      setSearchCategory(id)
    }else setSearchCategory('')
  }

  const handleChangeSearchQuery = (e:EventChange) => {
    const {target}:any = e
    setSearchQuery(target.value)
  }

  return (
    <FiltersContext.Provider
      value={{
        dates,
        filteredOperations,
        handleDividerCategory,
        searchCategory,
        handleChangeSearchQuery,
        // searchQuery
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { useFilters, FiltersProvider };
