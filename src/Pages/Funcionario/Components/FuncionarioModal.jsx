import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

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
      <div className="bg-white rounded-3xl p-8 max-w-xl min-w-[320px] m-4 relative z-10">

        <h1 className='font-semibold text-2xl text-center mb-6 xs:text-4xl sm:text-5xl'>Novo ponto de dor</h1>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 font-semibold text-lg">
            Título:
          </label>
          <input type="text" className="w-full bg-loginButtonsBackground mb-5
                  border border-evolutiLightGreen placeholder-evolutiGreen 
                  p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
            value={titulo}
            placeholder="Insira o título do ponto de dor"
            onChange={(e) => setTitulo(e.target.value)} required />

          <label className="mb-2 font-semibold text-lg">
            Descrição:
          </label>
          <textarea className="w-full bg-loginButtonsBackground mb-5 
                  border border-evolutiLightGreen placeholder-evolutiGreen 
                  p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker resize-none"
            value={description}
            rows={5}
            placeholder='Insira a descrição do ponto de dor'
            onChange={(e) => setDescription(e.target.value)} required />


          {/* Color selection */}
          <label className="mb-2 font-semibold text-lg">
            Selecione a cor:
          </label>
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
          <div className='flex items-center justify-center gap-x-4'>
            <button type="submit" className="bg-evolutiLightGreen hover:bg-evolutiGreen font-bold text-white py-1 px-6 rounded mt-4">Salvar</button>
            <button type="button" className="bg-gray-300 hover:bg-gray-400 font-bold py-1 px-6 rounded mt-4" onClick={onClose}>Cancelar</button>
          </div>
          <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}><IoClose size={25} /></button>
        </form>
      </div>
    </div>
  );
};

const ColorButton = ({ color, onClick, isSelected }) => {
  return (
    <button
      className={`p-3 rounded-full border-2 border-transparent mx-1 transition-all xs:p-4 
        hover:brightness-75 hover:border-black`}
      style={{
        backgroundColor: color,
        border: isSelected ? '2px solid #333' : '',
      }}
      onClick={onClick}
    ></button>
  );
};

export default Modal;
