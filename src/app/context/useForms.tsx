import { useDisclosure, useToast } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import {
  btnTitle,
  valueOfTypes,
  toastSettings,
  IFormsContext,
  IFormsProviderProps,
  IValueOfTypes,
  textFieldsSettings,
} from '../components/common/form/formSettings';

const defaultState = {
  isOpen: false,
  typeForm: {},
  onClose: () => {},
  fieldName: {},
  setTypeForm: () => {},
  openingForm: (type: string, countId?: string | null) => {},
  onToast: (type?: string) => {},
};

const FormsContext = createContext<IFormsContext>(defaultState);

const useForms = () => useContext(FormsContext);

const FormsProvider = ({ children }: IFormsProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [typeForm, setTypeForm] = useState<IValueOfTypes>({});
  const toast = useToast();

  const openingForm = (type: string, countId?: string | null) => {
    onOpen();
    const settings: IValueOfTypes = {
      type,
      title: valueOfTypes[type],
      btnTitle: btnTitle[type],
    };
    if (countId) settings.countId = countId;
    setTypeForm(settings);
  };

  const onToast = (type?: string) => {
    onClose();
    toast({
      description: 'Баланс обновлён',
      status: 'success',
      variant: 'top-accent',
      isClosable: true,
      ...toastSettings[type ? type : typeForm.type],
    });
  };

  return (
    <FormsContext.Provider
      value={{
        isOpen,
        openingForm,
        typeForm,
        onClose,
        onToast,
        fieldName: textFieldsSettings[typeForm.type],
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};

export { useForms, FormsProvider };
