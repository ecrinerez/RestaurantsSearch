import React from 'react';
import './Modals.css';

const DeleteModal = ({ name, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-box">
        <h3>Delete Restaurant</h3>
        <p>Are you sure you want to delete <strong>{name?.split(' (')[0]}</strong>? This action cannot be undone.</p>
        <div className="delete-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-delete-btn m-btn-bordo" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;