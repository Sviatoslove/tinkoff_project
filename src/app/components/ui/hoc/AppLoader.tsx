import { useEffect } from 'react';
import localStorageService from '../../../services/localStorage.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getDataOperLocal } from '../../../store/operationsSlice';
import { selectUser } from '../../../store/userSlice';

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser());

  useEffect(() => {
    if (!user && !!localStorageService.getUser()) {
      dispatch(getDataOperLocal());
    }
  }, []);

  return <>{children}</>;
};

export default AppLoader;
