import { Flex } from '@chakra-ui/react';
import UserBadge from './app/components/ui/badges/UserBadge';
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { selectIsLoadingUser, selectUser } from './app/store/userSlice';
import CustomSkeleton from './app/components/common/CustomSkeleton';
import CountsBadge from './app/components/ui/badges/CountsBadge';
import SearchInput from './app/components/ui/SearchInput';
import FormsLayouts from './app/layouts/FormsLayouts';
import {
  getDataOperLocal,
  selectOperations,
} from './app/store/operationsSlice';
import OperationsHistory from './app/components/ui/OperationsHistory';
import { useEffect } from 'react';
import ChartsBadge from './app/components/ui/badges/ChartsBadge';
import { selectIsLoadingCount } from './app/store/countsSlice';
import { AnalyticsProvider } from './app/context/useAnalytics';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser());
  const operations = useAppSelector(selectOperations());
  const loadingStatusUser = useAppSelector(selectIsLoadingUser());
  const IsLoadingCounts = useAppSelector(selectIsLoadingCount());

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      dispatch(getDataOperLocal());
    }
  }, []);

  return (
    <Flex flexDirection={'column'} mx={'auto'} maxW="1230px" h="100dvh" p={2}>
      <FormsLayouts user={user} />
      {user && !IsLoadingCounts && (
        <>
          <SearchInput />
          <Flex>
            <UserBadge user={user} />
            <CountsBadge />
            {operations && (
              <AnalyticsProvider>
                <ChartsBadge bg="#a9a958" />
                <ChartsBadge bg="#5ab2b2" view="general" />
              </AnalyticsProvider>
            )}
          </Flex>
          <AnalyticsProvider>
            <OperationsHistory />
          </AnalyticsProvider>
        </>
      )}
      {(loadingStatusUser || IsLoadingCounts || (IsLoadingCounts && !user)) && (
        <CustomSkeleton />
      )}
      {/* <CustomSkeletn />
       */}
    </Flex>
  );
}

export default App;
