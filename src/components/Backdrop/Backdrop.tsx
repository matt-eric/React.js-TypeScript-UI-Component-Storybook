import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  transitionDuration?: 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
}

export const Backdrop = forwardRef<HTMLDivElement, Props>(
  ({ children, open, onClose, transitionDuration = 500, ...props }, ref) => {
    const [opacity, setOpacity] = useState<0 | 80>(0);

    const backdropIsRenderable = useMemo<boolean>(() => open, [open]);

    useEffect(() => {
      if (backdropIsRenderable) {
        setTimeout((): void => {
          setOpacity(80);
        }, 1);
      }
    }, [backdropIsRenderable]);

    const handleClose = useCallback((): void => {
      setOpacity(0);
      setTimeout((): void => {
        onClose();
      }, transitionDuration);
    }, [transitionDuration]);

    return backdropIsRenderable
      ? createPortal(
          <FocusLock autoFocus={false}>
            <div
              className={`flex justify-center items-center fixed inset-0 bg-gray-800 transition-opacity ease-in-out duration-${transitionDuration} opacity-${opacity}`}
              data-testid="backdrop"
              onClick={handleClose}
              ref={ref}
              {...props}
            >
              {children}
            </div>
          </FocusLock>,
          document.body
        )
      : null;
  }
);
