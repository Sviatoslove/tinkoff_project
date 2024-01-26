import { createSlice } from '@reduxjs/toolkit';
import { ICategories, IOperation } from '../../models';
import { AppDispatch, RootState } from '../../types';
import {
  operationCreate,
  operationDelete,
  operationUpdate,
} from '../services/operations.service';
import {
  countsEditAddOperation,
  countsEditForOperation,
  countsEditRemoveOperation,
  countsToUped,
  getDataCountsLocal,
} from './countsSlice';
import localStorageService from '../services/localStorage.service';
import { getDataUserLocal } from './userSlice';

interface IOpertionState {
  entities: null | IOperation[];
  categories: null | ICategories[];
  dates: string[];
  isLoading: boolean;
  dataLoaded: boolean;
}

const initialState: IOpertionState = {
  entities: null,
  categories: null,
  dates: [],
  isLoading: false,
  dataLoaded: false,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    operationsRequested: (state) => {
      state.isLoading = true;
    },
    getDataFromLocal: (state, action) => {
      const { payload } = action;
      if (payload.oper !== 'null') {
        state.entities = payload.oper;
        state.categories = payload.categories;
        state.dates = payload.dates;
        state.dataLoaded = true;
      }
      state.isLoading = false;
    },
    operationsReceived: (state, action) => {
      const { payload } = action;
      let idCategory
      if (!state.entities) state.entities = [];
      if (payload.dataType === 'operations') {
        if (typeof payload.category === 'object') {
          if (!state.categories) state.categories = [];
          const categoryUniq = state.categories.some(({ name, id }) => {
            if(name === payload.category.name) {
              idCategory = id
              return true
            }
            return false
          })
          if (
            !categoryUniq
          ) {
            state.categories.push(payload.category);
            state.entities.push({ ...payload, category: payload.category.id });
          }else {
          state.entities.push({ ...payload, category: idCategory });
        }
        } else state.entities.push(payload);
      } else {
        if (!state.categories) state.categories = [];
        if(!state.categories.length) state.categories.push({name: 'Пополнение счёта', id: '12345', dataType: 'categoties'});
        state.entities.push({...payload, category: '12345' })
      }

      const { date } = payload;
      if (!state.dates.includes(date)) state.dates.push(date);
      localStorageService.setOper(state.entities);
      localStorageService.setDates(state.dates);
      localStorageService.setCategories(state.categories);
      state.isLoading = false;
      state.dataLoaded = true;
    },
    categoriesSaved: (state, action) => {
      const { payload } = action;
      if (
        !state.categories?.some(({ name }) => name === payload.name)
      ) {
        state.categories?.push(payload);
      }
      state.isLoading = false;
    },
    operationsTransform: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      if (state.entities) {
        const idxOper = state.entities.findIndex(
          (operation) => operation.id === id
        );

        if (payload.dataType === 'operations') {
          if (typeof payload.category === 'object') {
            const idxCategory = state.categories?.findIndex(
              (category) => category.id === payload.category.id
            );
            if (state.categories && idxCategory !== undefined) {
              state.categories[idxCategory] = {
                ...state.categories[idxCategory],
                ...payload.category,
              };
            }
            state.entities[idxOper] = {
              ...payload,
              category: payload.category.id,
            };
          } else
            state.entities[idxOper] = {
              ...state.entities[idxOper],
              ...action.payload,
            };
        } else {
          state.entities[idxOper] = {
            ...state.entities[idxOper],
            ...action.payload,
          };
        }
      }
      state.isLoading = false;
    },
    operationsRemoved: (state, action) => {
      const { id, date } = action.payload;
      if (state.entities?.length === 1) {
        state.dates = [];
        state.entities = null;
        state.dataLoaded = false;
      } else {
        let dateOper = date;
        state.entities = state.entities?.filter(
          (operation) => operation.id !== id
        )!;
        if (!state.entities?.some(({ date }) => date === dateOper)) {
          const idx = state.dates.indexOf(date);
          state.dates.splice(idx, 1);
        }
      }
      state.isLoading = false;
    },
  },
});

const { reducer: operationsReducer, actions } = operationsSlice;
const {
  operationsRequested,
  operationsReceived,
  operationsTransform,
  operationsRemoved,
  getDataFromLocal,
  categoriesSaved
} = actions;

export const getDataOperLocal = () => async (dispatch: AppDispatch) => {
  const count = localStorageService.getCount();
  dispatch(getDataCountsLocal(count));
  const user = localStorageService.getUser();
  const dates = localStorageService.getDates();
  const categories = localStorageService.getCategories();
  const oper = localStorageService.getOper();
  
  dispatch(operationsRequested());
  const data = await operationCreate(user);
  
  dispatch(
    getDataFromLocal({
      dates,
      categories,
      oper,
    })
    );
  dispatch(getDataUserLocal(data));
};

export const categoriesAdd =
  (payload: IOperation, onToast: (type?: string) => void, type?: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(operationsRequested());
    const data = await operationCreate(payload);
     dispatch(categoriesSaved(data));
    onToast(type);
  };

export const operationsSaved =
  (payload: IOperation, onToast: (type?: string) => void, type?: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(operationsRequested());
    const data = await operationCreate(payload);
    dispatch(operationsReceived(data));
    if (payload.dataType === 'operations')
      dispatch(countsEditAddOperation(payload));
    else dispatch(countsToUped(payload));
    onToast(type);
  };

export const operationsEdit =
  (payload: IOperation, onToast: (type?: string) => void, type?: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(operationsRequested());
    const data: any = await operationUpdate(payload);
    dispatch(countsEditForOperation(data));
    const newData = { ...data, oldBalance: data.balance };
    dispatch(operationsTransform(newData));
    onToast(type);
  };

export const operationsRemove =
  (payload: IOperation, onToast: (type?: string) => void, type: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(operationsRequested());
    const data: any = await operationDelete(payload);
    dispatch(operationsRemoved(data));
    dispatch(countsEditRemoveOperation(data));
    onToast(type);
  };

export const selectOperations = () => (state: RootState) =>
  state.operations.entities;
export const selectIsLoadingOperations = () => (state: RootState) =>
  state.operations.isLoading;

export const selectCategories = () => (state: RootState) =>
  state.operations.categories;

export const selectDates = () => (state: RootState) => state.operations.dates;

export default operationsReducer;
