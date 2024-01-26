import { createSlice } from '@reduxjs/toolkit';
import { FuncSimple, ICount, IOperation } from '../../models';
import { AppDispatch, RootState } from '../../types';
import { countCreate } from '../services/counts.service';
import localStorageService from '../services/localStorage.service';

interface ICountState {
  entities: null | ICount[];
  isLoading: boolean;
  dataLoaded: boolean;
}

const initialState: ICountState = {
  entities: null,
  isLoading: false,
  dataLoaded: false,
};

const countsSlice = createSlice({
  name: 'counts',
  initialState,
  reducers: {
    countsRequested: (state) => {
      state.isLoading = true;
    },
    getDataFromLocal: (state, action) => {
      const { payload } = action;
      if (payload) state.entities = payload;
      state.isLoading = false;
    },

    countsReceived: (state, action) => {
      const { payload } = action;
      if (!state.entities) state.entities = [];
      state.entities.push(payload);
      localStorageService.setCount(state.entities);
      state.isLoading = false;
      state.dataLoaded = true;
    },
    countsToUp: (state, action) => {
      const { countId } = action.payload;
      const count = state.entities?.find((count) => count.id === countId);
      if (count) count.balance = +count.balance + +action.payload.balance + '';
      localStorageService.setCount([count]);
    },
    countsTransformAddOper: (state, action) => {
      const { countId } = action.payload;
      const count = state.entities?.find((count) => count.id === countId);
      if (count) count.balance = +count.balance - +action.payload.balance + '';
      localStorageService.setCount([count]);
    },
    countsTransformEditAndRemoveOper: (state, action) => {
      const { balance, oldBalance, countId, dataType, dataAction } =
        action.payload;
      const count = state.entities?.find((count) => count.id === countId);
      if (count) {
        if (dataAction === 'removeOperation') {
          if (dataType === 'topUpCount')
            count.balance = +count.balance - +balance + '';
          else count.balance = +count.balance + +balance + '';
        } else if (dataAction === 'editOperation') {
          if (dataType === 'topUpCount')
            count.balance = +count.balance - +oldBalance + +balance + '';
          else count.balance = +count.balance + +oldBalance - +balance + '';
        }
      }
    },
  },
});

const { reducer: countsReducer, actions } = countsSlice;
const {
  countsRequested,
  countsReceived,
  countsToUp,
  countsTransformAddOper,
  countsTransformEditAndRemoveOper,
  getDataFromLocal,
} = actions;

export const getDataCountsLocal =
  (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(countsRequested())
    const data = await countCreate(payload);
    dispatch(getDataFromLocal(data));
  };

export const countsSaved =
  (payload: ICount, onToast: (type?: string) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(countsRequested());
    const data = await countCreate(payload);
    dispatch(countsReceived(data));
    onToast();
  };

export const countsToUped =
  (payload: IOperation) => async (dispatch: AppDispatch) => {
    dispatch(countsToUp(payload));
  };

export const countsEditAddOperation =
  (payload: IOperation) => async (dispatch: AppDispatch) => {
    dispatch(countsTransformAddOper(payload));
  };
export const countsEditRemoveOperation =
  (payload: IOperation) => async (dispatch: AppDispatch) => {
    dispatch(countsTransformEditAndRemoveOper(payload));
  };

export const countsEditForOperation =
  (payload: IOperation) => async (dispatch: AppDispatch) => {
    dispatch(countsTransformEditAndRemoveOper(payload));
  };

export const selectCounts = () => (state: RootState) => state.counts.entities;
export const selectCurrentCount = (id: string) => (state: RootState) =>
  state.counts.entities?.find((count) => count.id === id);
export const selectIsLoadingCount = () => (state: RootState) =>
  state.counts.isLoading;

export default countsReducer;
