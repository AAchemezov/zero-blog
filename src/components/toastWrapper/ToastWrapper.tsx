import React, {
  PropsWithChildren, useCallback, useContext, useState,
} from 'react';
import { nanoid } from 'nanoid';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface ToastItem {
  id?: string
  title: string,
  text?: string,
}

const ToastContext = React.createContext<(toast:ToastItem)=>void>(() => null);
export const useToast = () => useContext(ToastContext);

function ToastWrapper({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const onCloseToast = (index: number) => {
    setToasts((oldToasts) => [...oldToasts.slice(0, index), ...oldToasts.slice(index + 1)]);
  };

  const addToast = useCallback((toast: ToastItem) => {
    setToasts((old) => [...old, { ...toast, id: nanoid() }]);
  }, []);

  return (
    <>
      <ToastContainer position="top-end" className="position-fixed">
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            onClose={() => onCloseToast(index)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
      <ToastContext.Provider value={addToast}>
        {children}
      </ToastContext.Provider>
    </>
  );
}

export default ToastWrapper;
