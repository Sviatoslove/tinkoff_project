import { useEffect } from 'react';
import ModalWindow from '../components/common/ModalWindow';
import { useForms } from '../context/useForms';
import CountsForm from '../components/ui/forms/CountsForm';
import { IUser } from '../../models';

interface FormsLayoutsProps {
  user: IUser | null;
}

const FormsLayouts = ({ user }: FormsLayoutsProps) => {
  const { isOpen, openingForm, typeForm, onClose } = useForms();

  useEffect(() => {
    if (!user) openingForm('greeting');
    if(user)onClose()
  }, [user]);

  return (
    <ModalWindow
      title={typeForm.title}
      isOpen={isOpen}
      onClose={onClose}
      user={user}
    >
      <CountsForm 
      user={user}
      />
    </ModalWindow>
  );
};

export default FormsLayouts;
