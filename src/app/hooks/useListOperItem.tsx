import {
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForms } from '../context/useForms';
import {
  categoriesAdd,
  operationsEdit,
  operationsRemove,
  selectCategories,
  selectIsLoadingOperations,
} from '../store/operationsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { EventChange, EventClick, IOperation } from '../../models';
import { nanoid } from 'nanoid';
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import SelectedField from '../components/common/form/SelectedField';

const useListOperItem = (operation: IOperation) => {
  const dispatch = useAppDispatch();
  const isLoadingOperation = useAppSelector(selectIsLoadingOperations());
  const categories: any = useAppSelector(selectCategories())
  const { onToast } = useForms();
  const [isEditing, setIsEditing] = useState<string>('');
  const [actionCategory, setActionCategory] = useState<string>('');

  const getNameOfCategories = <T extends keyof { id: string; name: string }>(
    key: T,
    value: any
  ): string => {
    let res;
    if (categories && value) {
      res = categories?.find((category: any) => category[key] === value);
      if (res) {
        return res.name || res.id;
      }
    }
    return '';
  };
  const category: string = getNameOfCategories('id', operation.category);

  const [valueInput, setValueInput] = useState<IOperation>({
    ...operation,
  });

  const handleClick = (e: EventClick, typeField?: string) => {
    const target: any = e.target;
    const btn = target.closest('button');
    const oper = JSON.parse(btn.getAttribute('data-oper'));
    const dataAction = btn.getAttribute('data-action');
    const dataField = btn.getAttribute('data-field');
    if (dataAction === 'removeOperation') {
      dispatch(operationsRemove({ ...oper, dataAction }, onToast, dataAction));
    } else if (dataAction === 'editOperation') {
      if (typeField) {
        if (dataField !== 'category') {
          if (
            operation[typeField] !== valueInput[typeField] &&
            valueInput[typeField] !== ''
          ) {
            dispatch(
              operationsEdit(
                { ...valueInput, dataAction, category: operation.category },
                onToast,
                typeField + 'EditOperation'
              )
            );
            if (typeField === 'balance') {
              setValueInput({ ...valueInput, oldBalance: valueInput.balance });
            }
          } else setValueInput({ ...operation, category });
        }
        if (dataField === 'category') {
          if (category !== valueInput.category && valueInput.category !== '') {
            if (
              actionCategory === 'changeCategory' &&
              operation.category !== valueInput.category
            ) {
              dispatch(
                operationsEdit(
                  {
                    ...valueInput,
                    dataAction,
                  },
                  onToast,
                  typeField + 'EditOperation'
                )
              );
            } else if (actionCategory !== 'changeCategory') {
              const category: any = {
                name: valueInput.category,
                id: nanoid(),
                dataType: 'categories',
              };
              dispatch(categoriesAdd(category, onToast, 'categoryAdd'));
              dispatch(
                operationsEdit(
                  {
                    ...valueInput,
                    category,
                  },
                  onToast,
                  typeField + 'EditOperation'
                )
              );
            }
          } else setValueInput({ ...operation, category });
        }
      }
    }
    setActionCategory('');
    setIsEditing('');
  };

  const settingsWidth: { [key: string]: string } = {
    time: '10%',
    name: '25%',
    content: '25%',
    category: '20%',
    balance: '250px',
  };

  const handleEdit = (field: string, catAction?: string) => {
    if (catAction) setActionCategory(catAction);
    else setActionCategory('');
    if (categories && catAction === 'changeCategory') {
      setValueInput({
        ...operation,
        category: operation.category,
      });
    } else {
      setValueInput({
        ...operation,
        category,
      });
    }
    setIsEditing(field);
  };

  const handleClose = () => {
    setActionCategory('');
    setValueInput({ ...operation, category });
    setIsEditing('');
  };

  const clearActive = (e: any) => {
    const activeElement: any = document.activeElement;
    if (activeElement) {
      activeElement.onblur = function () {
        setTimeout(() => {
          setIsEditing('');
        }, 100);
      };
    }
  };

  const handleChange = (e: EventChange, field?: string) => {
    const { target }: any = e;
    setValueInput((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const editableControls = (field: string) => {
    return isEditing === field ? (
      <ButtonGroup justifyContent="start" size="xs">
        <IconButton
          _hover={{ bg: 'transparent', color: 'green' }}
          bg={'transparent'}
          icon={
            <CheckIcon
              shadow={
                '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(251 251 251)'
              }
            />
          }
          data-action="editOperation"
          data-field={field}
          aria-label="EditSave"
          onClick={(e) => handleClick(e, field)}
          w={'24px'}
        />
        <IconButton
          _hover={{ bg: 'transparent', color: 'red' }}
          bg={'transparent'}
          icon={
            <CloseIcon
              shadow={
                '0px 3px 4px 0px rgb(255 255 255), 0px 0px 5px 2px rgb(251 251 251)'
              }
            />
          }
          aria-label="EditClose"
          onClick={handleClose}
          w={'24px'}
          style={{ marginInline: 0 }}
        />
      </ButtonGroup>
    ) : (
      <>
        {operation.dataType === 'topUpCount' && field === 'category' ? null : (
          <Flex mr={2}>
            <Tooltip
              hasArrow
              label={field === 'category' ? 'Создать' : 'Изменить'}
              placement="top-start"
            >
              <IconButton
                _hover={{ bg: 'transparent', color: 'red' }}
                bg={'transparent'}
                size="xs"
                icon={
                  <EditIcon
                    shadow={
                      '0px 3px 4px 0px rgb(255 255 255), 0px 0px 5px 2px rgb(251 251 251)'
                    }
                  />
                }
                data-categoryaction={
                  field === 'category' ? 'createCategory' : ''
                }
                aria-label={field === 'category' ? 'CreateOpen' : 'EditOpen'}
                onClick={() => handleEdit(field)}
              />
            </Tooltip>
            <>
              {field === 'category' && (
                <Tooltip
                  hasArrow
                  label="Выбрать из своих"
                  placement="top-start"
                >
                  <IconButton
                    _hover={{ bg: 'transparent', color: 'red' }}
                    bg={'transparent'}
                    size="xs"
                    icon={
                      <HamburgerIcon
                        shadow={
                          '0px 3px 4px 0px rgb(255 255 255), 0px 0px 5px 2px rgb(251 251 251)'
                        }
                      />
                    }
                    data-categoryaction="changeCategory"
                    aria-label="EditOpen"
                    onClick={() => handleEdit(field, 'changeCategory')}
                  />
                </Tooltip>
              )}
            </>
          </Flex>
        )}
      </>
    );
  };

  const showFields = (width: string, field: string) => {
    const editValue: any = field === 'category' ? category : operation[field];
    const currency = field === 'balance' ? operation['currency'] : null;
    const value: any = valueInput[field];
    return (
      <Flex w={width} key={field} alignItems={'center'}>
        {editableControls(field)}
        {isEditing !== field ? (
          <Flex flexGrow={1} justifyContent={currency ? 'end' : 'start'}>
            <Text style={{ marginBottom: 0 }} color={editValue || 'grey'}>
              {(currency && category !== 'Пополнение счёта' ? '-':'') + (editValue || '--здесь ничего нет--')}
            </Text>
          </Flex>
        ) : (
          <Flex w={'100%'} justifyContent={'center'}>
            {actionCategory === 'changeCategory' ? (
              <SelectedField
                name={field}
                label=""
                error=""
                value={value}
                onChange={handleChange}
                options={categories?.slice(1)}
                category=""
                placeholder=""
                size="xs"
                onClick={clearActive}
              />
            ) : (
              <Input
                w={'80%'}
                size={'xs'}
                name={field}
                value={value}
                onChange={handleChange}
                onClick={clearActive}
              />
            )}
          </Flex>
        )}
        {currency && <img src={currency} width={'30px'} />}
      </Flex>
    );
  };

  const arrFields = ['time', 'name', 'content', 'category', 'balance'];

  return {
    isLoadingOperation,
    handleClick,
    settingsWidth,
    showFields,
    arrFields,
  };
};

export default useListOperItem;
