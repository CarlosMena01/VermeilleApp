import React from 'react';

interface IntroScreenProps {
    onNext: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onNext }) => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 bg-pink-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center border-2 border-pink-100 rotate-1 transform hover:rotate-0 transition-transform duration-500">
                <h2 className="text-2xl font-handwriting text-pink-600 mb-4">Bonjour!</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    No soy muy bueno dibujando, así que hice un pequeño regalo a mi manera...
                    Pero antes de verlo, ¡tienes que completar un pequeño reto!
                </p>
                <p className="text-gray-600 mb-8 italic">
                    ¿Quieres jugar un poquito?
                </p>
                <button
                    onClick={onNext}
                    className="btn w-full"
                >
                    Oui, je veux jouer!
                </button>
            </div>
        </div>
    );
};

export default IntroScreen;
