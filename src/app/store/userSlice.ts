import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models';
import { AppDispatch, RootState } from '../../types';
import { userCreate } from '../services/user.service';
import localStorageService from '../services/localStorage.service';

interface IUserState {
  entities: null | IUser;
  isLoading: boolean
}

const initialState: IUserState = {
  entities: null,
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true
    },
    getDataFromLocal: (state, action) => {
      const {payload}=action
      if(payload) state.entities=payload
    },

    userReceived: (state, action) => {
      state.entities = action.payload;
      localStorageService.setUser(state.entities);
      state.isLoading = false
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const { userRequested, userReceived, getDataFromLocal } = actions;

export const userSaved = (payload:IUser, onToast: (type?: string) => void) => async (dispatch: AppDispatch) => {
  dispatch(userRequested());
  const data = await userCreate(payload)
  dispatch(userReceived(data));
  onToast();
};

export const getDataUserLocal = (payload:any) => async (dispatch: AppDispatch) => {
  dispatch(getDataFromLocal(payload));
};

export const selectUser = () => (state: RootState) => state.user.entities;
export const selectUserId = () => (state: RootState) => state.user.entities?.id;
export const selectIsLoadingUser = () => (state: RootState) => state.user.isLoading;

export default userReducer;
