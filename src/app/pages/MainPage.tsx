import { Flex, useColorMode, useMediaQuery } from '@chakra-ui/react';
import SearchInput from '../components/ui/SearchInput';
import { FiltersProvider } from '../context/useFilters';
import FormsLayouts from '../layouts/FormsLayouts';
import UserBadgeForMain from '../components/ui/badges/UserBadgeForMain';
import CountsBadge from '../components/ui/badges/CountsBadge';
import ChartsBadge from '../components/ui/badges/ChartsBadge';
import OperationsHistory from '../components/ui/OperationsHistory';
import CustomSkeleton from '../components/common/skeletons/CustomSkeleton';
import { useAppSelector } from '../hooks/hooks';
import { selectIsLoadingUser, selectUser } from '../store/userSlice';
import { selectOperations } from '../store/operationsSlice';
import { selectIsLoadingCount } from '../store/countsSlice';

const MainPage = () => {
  const [isLessThan814] = useMediaQuery('(max-width: 814px)');
  const [isLargeThan671] = useMediaQuery('(min-width: 671px)');
  const user = useAppSelector(selectUser());
  const operations = useAppSelector(selectOperations());
  const loadingStatusUser = useAppSelector(selectIsLoadingUser());
  const IsLoadingCounts = useAppSelector(selectIsLoadingCount());

  return (
    <>
      <FormsLayouts user={user} />
      {user && !IsLoadingCounts && (
        <FiltersProvider>
          <SearchInput />

          <Flex flexDirection={{ base: 'column', '2lg': 'row' }}>
            <Flex>
              {isLargeThan671 && <UserBadgeForMain user={user} />}
              <CountsBadge />
              {isLessThan814 && <ChartsBadge view="general" />}
            </Flex>
            {operations && (
              <Flex w={{ '2lg': '100%' }}>
                {!isLessThan814 && <ChartsBadge view="general" />}
                <ChartsBadge />
              </Flex>
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
