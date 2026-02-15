import React from 'react';
import { RefreshCcw } from 'lucide-react';
import usImage from '../assets/us.jpg';

interface FinalScreenProps {
    onRestart: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onRestart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-red-50 to-pink-100 p-8 text-center">
            <div className="relative mb-8 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <img
                    src={usImage}
                    alt="Nosotros"
                    className="relative rounded-full w-48 h-48 object-cover border-4 border-white shadow-2xl"
                />
            </div>

            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-6">
                Je t'aime Je t'aime Je t'aime ❤️
            </h1>

            <p className="text-lg text-gray-700 max-w-xs mx-auto mb-10 leading-relaxed">
                Gracias por la felicidad que me das cada día, por tu amor y por ser mi todo. TE AMO DEMASIADO MI BÉBÉ.
            </p>

            {/* <button
                onClick={onRestart}
                className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors text-sm"
            >
                <RefreshCcw size={16} />
                Volver a vivirlo
            </button> */}

            <footer className="absolute bottom-4 text-xs text-gray-400">
                Hecho por tu Colombiano favorito
            </footer>
        </div>
    );
};

export default FinalScreen;
