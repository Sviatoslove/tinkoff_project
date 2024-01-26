import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FuncSimple, IUser } from '../../../models';

interface ModalWindowProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  user: IUser | null;
  onClose: FuncSimple;
}

const ModalWindow = ({
  title,
  content,
  children,
  isOpen,
  onClose,
  user,
}: ModalWindowProps) => {
  const handleClose = () => {
    if (!user) return;
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          {user && <ModalCloseButton />}
          <ModalBody>
            {content && content}
            {children && children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWindow;
