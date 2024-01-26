import { Flex } from '@chakra-ui/react';
import UserBadge from './app/components/ui/badges/UserBadge';
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { selectIsLoadingUser, selectUser } from './app/store/userSlice';
import CustomSkeleton from './app/components/common/CustomSkeleton';
import CountsBadge from './app/components/ui/badges/CountsBadge';
import SearchInput from './app/components/ui/SearchInput';
import FormsLayouts from './app/layouts/FormsLayouts';
import { getDataOperLocal } from './app/store/operationsSlice';
import OperationsHistory from './app/components/ui/OperationsHistory';
import { useEffect } from 'react';
import ChartsBadge from './app/components/ui/badges/ChartsBadge';

function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser());
  const loadingStatusUser = useAppSelector(selectIsLoadingUser());

  useEffect(()=>{
    dispatch(getDataOperLocal())
  },[])

  return (
    <Flex flexDirection={'column'} mx={'auto'} maxW="1230px" h="100dvh" p={2}>
      <FormsLayouts user={user} />
      {user && (
        <>
          <SearchInput />
          <Flex>
            <UserBadge user={user} />
            <CountsBadge/>
            <ChartsBadge view='general'/>
            <ChartsBadge />
          </Flex>
          <OperationsHistory />
        </>
      )}
      {loadingStatusUser && <CustomSkeleton />}
      {/* <CustomSkeleton />
       */}
    </Flex>
  );
}

export default App;
