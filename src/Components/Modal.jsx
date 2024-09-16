import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <motion.div
        className="fixed inset-1/4 bg-white p-6 rounded-lg shadow-lg z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </>
  );
};

export default Modal;
