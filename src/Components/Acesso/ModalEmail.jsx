import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Modal = ({ showModal, closeModal, message, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
    closeModal();
  };

  return (
    <div className={`fixed inset-0 ${showModal ? 'flex' : 'hidden'} items-center justify-center z-50`}>
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeModal}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full z-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmação</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p>{message}</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-3 p-2 border border-gray-300 rounded w-full"
            placeholder="Digite o valor aqui"
          />
        </div>
        <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleSubmit}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Enviar
          </button>
          <button
            onClick={closeModal}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
