import overlayStyles from './modal-overlay.module.css';
import React from 'react';
import { IModalOverlay } from '../../utils/interfaces';

export const ModalOverlay = React.forwardRef<HTMLDivElement, IModalOverlay>((props, ref) => {

  return (
    <div ref={ref} className={overlayStyles.overlay} onClick={props.closeFunction}>
    </div>
  )
})


