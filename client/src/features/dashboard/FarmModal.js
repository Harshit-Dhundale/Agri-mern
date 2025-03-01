// client/src/features/dashboard/FarmModal.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FarmDetailsForm from './FarmDetailsForm';
import './FarmModal.css';

const modalRoot = document.getElementById('modal-root');

const FarmModal = ({ isOpen, onClose, farmData, onSubmit, userId }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="farm-modal-overlay" onClick={onClose}>
      <div className="farm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{farmData ? 'Edit Farm' : 'New Farm'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <FarmDetailsForm
            farmData={farmData}
            onUpdate={(data) => {
              onSubmit(data);
              onClose();
            }}
            userId={userId}
          />
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default FarmModal;