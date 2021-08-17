import { ReactNode, useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppProvider';

import { Container } from './styles';

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const { modal, setModal } = useContext(AppContext);

  useEffect(() => {
    const handleClose = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setModal(false);
    };

    window.addEventListener('keyup', handleClose);

    return () => {
      window.removeEventListener('keyup', handleClose);
    };
  }, [setModal]);

  const handleClick = (): void => setModal(false);

  return (
    <Container className={modal ? 'actived' : ''} onClick={handleClick}>
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          event.stopPropagation()
        }
      >
        {children}
      </div>
    </Container>
  );
}

export default Modal;
