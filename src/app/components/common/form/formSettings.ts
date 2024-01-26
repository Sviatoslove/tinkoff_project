import { FuncSimple } from '../../../../models';

type FormOpen = boolean;

interface IValueOfTypes {
  [key: string]: string;
}

interface IToastSettings {
  [key: string]: IValueOfTypes;
}

interface INameLabel {
  name: string;
  label: string;
  typeField: string;
  placeholder?: string;
}

interface ICountsCreate {
  textName: INameLabel;
  defaultState: IValueOfTypes;
}

interface IAddOperation {
  textBalance: INameLabel;
  textName: INameLabel;
  textContent: INameLabel;
  textCategory: INameLabel;
  selectCategory: INameLabel;
  defaultState: IValueOfTypes;
}

interface ITopUpCount {
  textBalance: INameLabel;
  textName: INameLabel;
  textContent: INameLabel;
  defaultState: IValueOfTypes;
}

interface ITextFieldsSettings {
  [key: string]: ICountsCreate | IAddOperation | ITopUpCount;
}

type OpeningForm = (type: string, countId?: string | null) => void;

interface IFormsContext {
  isOpen: FormOpen;
  typeForm: IValueOfTypes;
  onClose: FuncSimple;
  onToast: (type?: string) => void;
  fieldName: ICountsCreate | IAddOperation | ITopUpCount | any;
  openingForm: OpeningForm;
}

interface IFormsProviderProps {
  children: React.ReactNode;
}
const valueOfTypes: IValueOfTypes = {
  greeting: 'Привет, как тебя зовут?',
  countsCreate: 'Подайте заявку на свою первую карту',
  addOperation: 'Вы сегодня купили: ',
  topUpCount: 'Укажите сумму для пополнения счёта:',
  addTranslate: 'Укажите сумму для перевода средств:',
};

const btnTitle: IValueOfTypes = {
  greeting: 'Продолжить',
  countsCreate: 'Подать заявку',
  addOperation: 'Сохранить покупку',
  topUpCount: 'Пополнить счёт',
  addTranslate: 'Перевести средства',
};

const toastSettings: IToastSettings = {
  greeting: {
    title: 'Вы вошли в систему!',
    description: 'Сейчас вам доступны некоторые функции приложения',
  },
  countsCreate: {
    title: 'Запрос подтверждён!',
    description: 'Карта добавлена. Можете пользоваться картой.',
  },
  addOperation: {
    title: 'Операция по покупке добавлена!',
  },
  removeOperation: {
    title: 'Операция успешно удалена!',
  },
  timeEditOperation: {
    title: 'Вы изменили время создания опреации!',
    description: 'Время операции обновлено.',
  },
  nameEditOperation: {
    title: 'Вы изменили имя опреации!',
    description: 'Имя операции обновлено.',
  },
  balanceEditOperation: {
    title: 'Вы изменили баланс опреации!',
  },
  contentEditOperation: {
    title: 'Вы изменили описание опреации!',
    description: 'Описание операции обновлено.',

  },
  categoryEditOperation: {
    title: 'Вы изменили название категории опреации!',
    description: 'Категория операции обновлена.',
  },
  categoryAdd: {
    title: 'Категория содана успешно!',
    description: 'Список категорий обновлён',
  },
  topUpCount: {
    title: 'Счёт пополнен!',
  },
  addTranslate: {
    // title: 'Перевод совершён!',
    title: 'Недоступная функция!',
    description: 'Ваш тариф не позволяет использовать эту функцию',
    status: 'warning',
  },
};

const textFieldsSettings: ITextFieldsSettings = {
  greeting: {
    textName: {
      typeField: 'textField',
      name: 'name',
      label: '',
      placeholder: 'Твоё имя',
    },
    defaultState: {
      name: '',
    },
  },
  countsCreate: {
    textName: {
      typeField: 'textField',
      name: 'name',
      label: 'Введите название счёта',
    },
    defaultState: {
      name: '',
    },
  },
  addOperation: {
    textBalance: {
      typeField: 'textField',
      name: 'balance',
      label: 'Введите потраченную сумму',
    },
    textName: {
      typeField: 'textField',
      name: 'name',
      label: 'Введите название операции',
    },
    textContent: {
      typeField: 'textField',
      name: 'content',
      label: 'Введите комментарий',
    },
    textCategory: {
      typeField: 'textField',
      name: 'category',
      label: 'Создайте категорию покупки',
      placeholder: 'или выберите её из своих категорий',
    },
    selectCategory: {
      typeField: 'selectField',
      name: 'selectCategory',
      label: 'Ваши категории',
      placeholder: 'Выберите из своих категорий',
    },
    defaultState: {
      balance: '',
      name: '',
      content: '',
      category: '',
      selectCategory: '',
    },
  },
  topUpCount: {
    textBalance: {
      typeField: 'textField',
      name: 'balance',
      label: 'Введите сумму пополнения счёта',
    },
    textName: {
      typeField: 'textField',
      name: 'name',
      label: 'Введите название пополнения счёта',
    },
    textContent: {
      typeField: 'textField',
      name: 'content',
      label: 'Введите комментарий',
    },
    defaultState: {
      balance: '0',
      name: '',
      content: '',
    },
  },
  addTranslate: {
    textBalance: {
      typeField: 'textField',
      name: 'balance',
      label: 'Введите сумму перевода',
    },
    textName: {
      typeField: 'textField',
      name: 'name',
      label: 'Введите название перевода',
    },
    textContent: {
      typeField: 'textField',
      name: 'content',
      label: 'Введите комментарий',
    },
    defaultState: {
      balance: '',
      name: '',
      content: '',
    },
  },
};

export { valueOfTypes, btnTitle, toastSettings, textFieldsSettings };

export type { IFormsContext, IFormsProviderProps, IValueOfTypes };
