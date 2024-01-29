import { Flex, useColorMode } from '@chakra-ui/react';
import SearchInput from '../components/ui/SearchInput';
import { FiltersProvider } from '../context/useFilters';
import FormsLayouts from '../layouts/FormsLayouts';
import UserBadge from '../components/ui/badges/UserBadge';
import CountsBadge from '../components/ui/badges/CountsBadge';
import ChartsBadge from '../components/ui/badges/ChartsBadge';
import OperationsHistory from '../components/ui/OperationsHistory';
import CustomSkeleton from '../components/common/CustomSkeleton';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectIsLoadingUser, selectUser } from '../store/userSlice';
import { getDataOperLocal, selectOperations } from '../store/operationsSlice';
import { selectIsLoadingCount } from '../store/countsSlice';
import { useEffect } from 'react';
import localStorageService from '../services/localStorage.service';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const user = useAppSelector(selectUser());
  const operations = useAppSelector(selectOperations());
  const loadingStatusUser = useAppSelector(selectIsLoadingUser());
  const IsLoadingCounts = useAppSelector(selectIsLoadingCount());

  useEffect(() => {
    if (!user && !!localStorageService.getUser()) {
    console.log('useEffect:')

      dispatch(getDataOperLocal());
    }
  }, []);

  return (
    <>
      <FormsLayouts user={user} />
      {user && !IsLoadingCounts && (
        <FiltersProvider>
          <SearchInput />
          <Flex>
            <UserBadge user={user} />
            <CountsBadge />
            {operations && (
              <>
                <ChartsBadge
                  bg={'colorBadgeChartAll.' + colorMode}
                  view="general"
                />
                <ChartsBadge bg={'colorBadgeChartCategories.' + colorMode} />
              </>
            )}
          </Flex>
          <OperationsHistory />
        </FiltersProvider>
      )}
      {(loadingStatusUser || IsLoadingCounts || (IsLoadingCounts && !user)) && (
        <CustomSkeleton />
      )}
      {/* <CustomSkeleton /> */}
    </>
  );
};

export default MainPage;
