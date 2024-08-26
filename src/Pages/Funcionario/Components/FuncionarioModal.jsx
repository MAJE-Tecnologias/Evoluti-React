import { useState } from 'react';

const Modal = ({ show, onClose, onSubmit, selectedColor, onColorChange }) => {
  const [titulo, setTitulo] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, description, selectedColor });
    setTitulo('');
    setDescription('');
    onClose();
  };

  const handleColorChange = (color) => {
    onColorChange(color);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-10">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>Fechar</button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Título:
            <input type="text" className="form-input mt-1 block w-full" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </label>
          <label className="block mb-2">
            Descrição:
            <textarea className="form-textarea mt-1 block w-full" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>

          {/* Color selection */}
          <div className="flex justify-center mb-4">
            {['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#EE82EE', '#FFC0CB', '#808080'].map((color, index) => (
              <ColorButton
                key={index}
                color={color}
                onClick={() => handleColorChange(color)}
                isSelected={selectedColor === color}
              />
            ))}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">Salvar</button>
        </form>
      </div>
    </div>
  );
};

const ColorButton = ({ color, onClick, isSelected }) => {
  return (
    <button
      className={`w-10 h-10 rounded-full mx-1`}
      style={{
        backgroundColor: color,
        border: isSelected ? '2px solid #333' : 'none', // Example border for selected color
      }}
      onClick={onClick}
    ></button>
  );
};

export default Modal;
