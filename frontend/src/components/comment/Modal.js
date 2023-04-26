import React from 'react';
import {CSSTransition} from 'react-transition-group';
import './Modal.css';


const Modal = props => {


    return (

    <div>
        <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{enter: 0, exit: 3000}}
        >
        <div className={`modal ${props.show ? 'show' : ''}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h4 className='modal-title'>{props.title}</h4>
            
                </div>
                <div className='modal-body'>{props.children}</div>
                <div className='modal-footer'>
                    <button className='button' onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
        </CSSTransition>
    </div>
    
    )
}

export default Modal;