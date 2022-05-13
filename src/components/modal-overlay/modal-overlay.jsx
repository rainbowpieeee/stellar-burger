import overlayStyles from './modal-overlay.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export const ModalOverlay = React.forwardRef((props, ref) => {


  return (
    <div ref={ref} className={overlayStyles.overlay} onClick={props.closeFunction}>
    </div>
  )
})

ModalOverlay.propTypes = {
  closeFunction: PropTypes.func.isRequired
}
