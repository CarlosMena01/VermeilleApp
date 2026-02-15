import React, { useEffect, useState } from 'react';


interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 text-center p-8 fade-in">
        <h1 className="text-4xl font-bold mb-4 text-pink-600 drop-shadow-sm">
          Feliz San Valentín <br /> mon amour :3
        </h1>
        <p className="text-xl text-pink-500 mb-8 font-light">
          Tengo una pequeña sorpresa para ti...
        </p>

        <button
          onClick={onStart}
          className="btn animate-bounce"
        >
          ¿Quieres saber qué es?
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
