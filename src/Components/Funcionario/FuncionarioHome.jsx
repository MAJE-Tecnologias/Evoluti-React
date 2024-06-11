import { useRef, useState, useEffect } from 'react';

const FuncionarioHome = () => {
  const canvasRef = useRef(null);
  const [clickPosition, setClickPosition] = useState(null);

  useEffect(() => {
    if (clickPosition) {
      drawCircle();
    }
  }, [clickPosition]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickPosition({ x, y });
  };

  const drawCircle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = clickPosition;
    if (x !== null && y !== null) {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      ></canvas>
    </div>
  );
};

export default FuncionarioHome;
