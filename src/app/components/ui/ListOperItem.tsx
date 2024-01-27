import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { IOperation } from '../../../models';
import { SmallCloseIcon } from '@chakra-ui/icons';
import SkeletonOperItem from '../common/SkeletonOperItem';
import useListOperItem from '../../hooks/useListOperItem';

const ListOperItem = ({ operation }: { operation: IOperation }) => {
  const {
    isLoadingOperation,
    handleClick,
    settingsWidth,
    showFields,
    arrFields,
  } = useListOperItem(operation);

  return (
    <>
      {!isLoadingOperation ? (
        <Flex
          w={'100%'}
          mb={3}
          direction={'column'}
          borderRadius={15}
          shadow={
            '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(178 218 221)'
          }
          p={2}
        >
          <Flex justify={'space-evenly'} align={'center'}>
            {arrFields.map((field: any) =>
              showFields(settingsWidth[field], field)
            )}

            <Tooltip hasArrow label="Удалить" placement="top-start">
              <IconButton
                minW={'30px'}
                h={'30px'}
                bg={'red'}
                data-action="removeOperation"
                onClick={handleClick}
                aria-label="Удалить"
                icon={<SmallCloseIcon />}
                data-oper={JSON.stringify(operation)}
                ml={5}
              />
            </Tooltip>
          </Flex>
        </Flex>
      ) : (
        <SkeletonOperItem />
      )}
    </>
  );
};

export default ListOperItem;
