import * as React from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import { CloseIcon } from '../../General/Icon/components';
import { escEvent as createEscapeKeyEventListener } from '../../Utils/DomUtils';
import { checkIsChildrenInMultiLines } from './utils';
import {
  ModalContainer,
  ModalDialog,
  ModalContentArea,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './ModalStyle';

const Modal = (props: Props) => {
  const {
    isVisible,
    title,
    onClose,
    children,
    className,
    hideContentArea,
    centering,
    removeAnimation,
    footer,
    size,
    hideHeader,
    ...restProps
  } = props;

  const modalContentAreaRef = React.useRef(null);
  const modalFooterRef = React.useRef(null);
  const [
    isFooterChildrenInMultiLines,
    setIsFooterChildrenInMultiLines,
  ] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!modalContentAreaRef.current) return;

    if (isVisible) {
      // On modal open
      modalContentAreaRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      // On modal close
      document.body.removeAttribute('style');
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, [isVisible, modalContentAreaRef]);

  React.useEffect(() => {
    const escapeKeyEventListener = createEscapeKeyEventListener(() => {
      if (isVisible) onClose();
    });

    document.addEventListener('keydown', escapeKeyEventListener, false);

    // This function will be called on unmount and _before_ this effect is
    // re-executed because its dependencies changed. This gives us the chance
    // to clean up the existing escape key event listener.
    return () =>
      document.removeEventListener('keydown', escapeKeyEventListener, false);
  }, [isVisible, onClose]);

  React.useLayoutEffect(
    function checkFooterResponsiveStyleOnMountAndOnWindowResize() {
      const checkIsFooterChildrenInMultiLines = () => {
        const isChildrenInMultiLines = checkIsChildrenInMultiLines(
          modalFooterRef
        );
        setIsFooterChildrenInMultiLines(isChildrenInMultiLines);
      };
      const debouncedCheckFooter = debounce(
        checkIsFooterChildrenInMultiLines,
        500
      );
      debouncedCheckFooter();
      window.addEventListener('resize', debouncedCheckFooter);
      return () => window.removeEventListener('resize', debouncedCheckFooter);
    },
    []
  );

  // To prevent the modal from closing
  // when a mousedown event occurs inside the ModalContentArea
  // but the subsequent mouseup event occurs outside
  const mouseDownTarget = React.useRef<HTMLElement>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      const element = e.target as HTMLElement;
      mouseDownTarget.current = element;
    },
    [mouseDownTarget]
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      const element = e.target as HTMLElement;
      if (mouseDownTarget.current === element) {
        onClose();
      }
    },
    [mouseDownTarget, onClose]
  );

  return (
    <ModalContainer
      data-testid="modal-container"
      className={classNames('aries-modal', className)}
      centering={centering}
      isOpen={isVisible}
      removeAnimation={removeAnimation}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <ModalDialog className="modal-dialog">
        <ModalContentArea
          className="modal-content"
          data-testid="dialog"
          role="dialog"
          aria-modal="true"
          hideContentArea={hideContentArea}
          centering={centering}
          onClick={e => e.stopPropagation()}
          tabIndex={0}
          isOpen={isVisible}
          removeAnimation={removeAnimation}
          size={size}
          ref={modalContentAreaRef}
          {...restProps}
        >
          {!hideHeader && (
            <ModalHeader className="modal-header">
              <h3>{title}</h3>
              <button
                aria-label="Close button"
                data-testid="close-button"
                type="button"
                onClick={onClose}
              >
                <CloseIcon color={hideContentArea ? 'white' : 'grey'} />
              </button>
            </ModalHeader>
          )}
          <ModalBody
            className="modal-body"
            hideContentArea={hideContentArea}
            centering={centering}
          >
            {isVisible && children}
          </ModalBody>
          {footer !== undefined && (
            <ModalFooter
              ref={modalFooterRef}
              className="modal-footer"
              isChildrenInMultiLines={isFooterChildrenInMultiLines}
            >
              {footer}
            </ModalFooter>
          )}
        </ModalContentArea>
      </ModalDialog>
    </ModalContainer>
  );
};

export type sizeType = 's' | 'm' | 'l' | 'xl';

interface Props
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ModalContentArea>,
    'title' // we don't really use this title attribute for div element
  > {
  children: React.ReactNode;
  title?: React.ReactNode;
  isVisible: boolean;
  onClose?(): void;
  hideContentArea?: boolean;
  centering?: boolean;
  removeAnimation?: boolean;
  footer?: React.ReactElement[];
  size?: sizeType;
  hideHeader?: boolean;
}

Modal.defaultProps = {
  onClose: () => undefined as () => void,
};

export default Modal;
