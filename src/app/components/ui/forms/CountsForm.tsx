import { IStateProps, useFormsData } from '../../../hooks/useFormsData';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { validatorConfig } from '../../../utils/validator';
import TextField from '../../common/form/TextField';
import { useAppSelector } from '../../../hooks/hooks';
import { selectIsLoadingCount } from '../../../store/countsSlice';
import { useIteractionCount } from '../../../hooks/useInteractionCount';
import SelectedField from '../../common/form/SelectedField';
import {
  selectCategories,
  selectIsLoadingOperations,
} from '../../../store/operationsSlice';
import { IUser } from '../../../../models';

const CountsForm = ({ user }: { user: IUser | null }) => {
  const isLoadingCount = useAppSelector(selectIsLoadingCount());
  const isLoadingOperation = useAppSelector(selectIsLoadingOperations());
  const categories = useAppSelector(selectCategories());
  const { onSubmit, titleBtn, type, onClose, fieldName } = useIteractionCount();
  const { defaultState } = fieldName;

  const useFormsDataProps: IStateProps = {
    state: {
      defaultState,
      errors: validatorConfig,
    },
  };

  interface IFieldsProps {
    name: string;
    label: string;
    placeholder: string;
  }

  const { register, data, handleSubmit, errors } =
    useFormsData(useFormsDataProps);

  const { category, selectCategory } = data.defaultState;

  const fields: any = {
    textField: ({ name, label, placeholder }: IFieldsProps) => {
      return (
        <TextField
          {...register(name, label)}
          key={label + 10}
          placeholder={placeholder}
          selectCategory={selectCategory}
        />
      );
    },
    selectField: ({ name, label, placeholder }: IFieldsProps) => (
      <SelectedField
        {...register(name, label)}
        key={label}
        options={categories?.slice(1)}
        placeholder={placeholder}
        category={category}
        size='sm'
      />
    ),
  };

  const getOptionArray = () => {
    return Object.values(fieldName)
      .slice(0, -1)
      .map((field: any) => fields[field.typeField](field));
  };

  if (selectCategory) delete errors.fields.category;

  return (
    <Box pb={5} px={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>{getOptionArray()}</>
        <Flex mt={4} ml={'auto'} w={'fit-content'}>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="green"
              type="submit"
              isDisabled={!!Object.values(errors.fields).length}
              isLoading={isLoadingCount || isLoadingOperation}
              loadingText="Отправка запроса"
            >
              {titleBtn}{' '}
            </Button>
          </Stack>
          {user && (
            <Button ml={4} onClick={onClose}>
              Назад
            </Button>
          )}
        </Flex>
      </form>
    </Box>
  );
};

export default CountsForm;
