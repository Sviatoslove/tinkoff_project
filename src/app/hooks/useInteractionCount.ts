import { nanoid } from 'nanoid';
import { EventClick, ICount, IOperation, IUser } from '../../models';
import { useForms } from '../context/useForms';
import { useAppDispatch, useAppSelector } from './hooks';
import { IFormsState } from './useFormsData';
import { RubIcon } from '../../assets/currency';
import CardImageFlowers from '../../assets/icons';
import localStorageService from '../services/localStorage.service';
import {
  countsSaved,
  selectCounts,
  selectCurrentCount,
} from '../store/countsSlice';
import { useToast } from '@chakra-ui/react';
import { operationsSaved } from '../store/operationsSlice';
import { getRandomAvatar } from '../utils/getRandomAvatar';
import getRandomNum from '../utils/getRandomNum';
import Avatars from '../mockData';
import { userSaved } from '../store/userSlice';

export function useIteractionCount() {
  const dispatch = useAppDispatch();
  const { onToast, openingForm, typeForm, onClose, fieldName } = useForms();
  const counts = useAppSelector(selectCounts());
  const currentCount = useAppSelector(selectCurrentCount(typeForm.countId));
  const toast = useToast();

  const onSubmit = (data: IFormsState) => {
    const { name, balance, content, category, selectCategory } =
      data.defaultState;
    const createdAt = new Date().toLocaleString();
    const time = createdAt.split(',')[1].slice(0, -3);
    const date = createdAt.split(',')[0];
    switch (typeForm.type) {
      case 'greeting': {
        const icon = getRandomAvatar(Avatars[0])[getRandomNum(0, 199)];
        const user: IUser = {
          name,
          icon,
          id: nanoid(),
        };
        dispatch(userSaved(user, onToast));
        onClose();
        break;
      }
      case 'countsCreate': {
        const count: ICount = {
          id: nanoid(),
          name,
          type: 'Дебетовая',
          currency: RubIcon,
          icon: CardImageFlowers,
          balance: '0',
          userId: localStorageService.getUser(),
          createdAt,
          dataType: 'counts',
          bgColor: '#565555',
          textColor: 'white',
        };
        dispatch(countsSaved(count, onToast));
        break;
      }
      case 'addOperation': {
        if (currentCount && +currentCount.balance < +balance) {
          toast({
            title: 'Внимание!',
            description: `У вас недостаточно средств на счёте. Ваш баланс: ${currentCount.balance}`,
            status: 'warning',
            variant: 'top-accent',
            isClosable: true,
          });
          return;
        }
        const operation: IOperation = {
          id: nanoid(),
          userId: localStorageService.getUser().id,
          countId: typeForm.countId,
          name,
          currency: RubIcon,
          balance,
          oldBalance: balance,
          createdAt,
          date,
          time,
          dataType: 'operations',
          content,
          category: category
            ? { name: category, id: nanoid(), dataType: 'categories' }
            : selectCategory,
        };
        dispatch(operationsSaved(operation, onToast));
        break;
      }
      case 'topUpCount': {
        const countUp: IOperation = {
          id: nanoid(),
          userId: localStorageService.getUser().id,
          countId: typeForm.countId,
          name,
          time,
          date,
          currency: RubIcon,
          balance,
          content,
          oldBalance: balance,
          createdAt: new Date().toISOString(),
          dataType: 'topUpCount',
        };
        dispatch(operationsSaved(countUp, onToast));
        break;
      }
    }
  };

  const handleClickCount = (e: EventClick) => {
    const target: any = e.target;
    let countId = null;
    const btn = target.closest('button');
    const wrapCount = btn.parentElement.previousElementSibling;
    const balanceCount = wrapCount?.getAttribute('data-balance');
    const type = btn.getAttribute('dataType');
    if (type !== 'countsCreate') {
      countId = wrapCount.getAttribute('data-countid');
    } else {
      if (counts) {
        toast({
          title: 'Недоступная функция!',
          description: 'Для добавления новых карт обратитесь в отделение банка',
          status: 'error',
          variant: 'top-accent',
          isClosable: true,
        });
        return;
      }
    }

    if (type === 'addTranslate') {
      toast({
        title: 'Недоступная функция!',
        description:
          'У вас должно быть более одного счёта, чтобы использовать эту функцию',
        status: 'warning',
        variant: 'top-accent',
        isClosable: true,
      });
      return;
    }
    if (type === 'addOperation') {
      if (balanceCount === '0') {
        toast({
          title: 'Недоступная функция!',
          description:
            'Вам необходимо пополнить баланс, чтобы использовать эту функцию',
          status: 'error',
          variant: 'top-accent',
          isClosable: true,
        });
        return;
      }
    }
    openingForm(type, countId);
  };

  return {
    handleClickCount,
    onSubmit,
    titleBtn: typeForm.btnTitle,
    type: typeForm.type,
    onClose,
    fieldName,
  };
}
