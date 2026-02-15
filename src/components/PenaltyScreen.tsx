import React, { useState } from 'react';
import { Camera, Gift } from 'lucide-react';
import puzzleImage from '../assets/puzzle.jpg';

interface PenaltyScreenProps {
    onContinue: () => void;
}

const PenaltyScreen: React.FC<PenaltyScreenProps> = ({ onContinue }) => {
    const [accepted, setAccepted] = useState(false);

    if (accepted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm border-4 border-pink-300">
                    <Gift className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-2xl font-bold text-pink-600 mb-4">¡Está bien!</h2>
                    <img src={puzzleImage} alt="Puzzle" className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-gray-700 mb-6 font-medium">
                        Como igual te amo mucho (y sé que cumplirás el castigo), quiero que veas tus cartas de todas formas mi amorcito ❤️
                    </p>
                    <button
                        onClick={onContinue}
                        className="btn w-full shadow-lg"
                    >
                        Ver mis cartas 💌
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm border-4 border-pink-300 transform -rotate-2">
                <Camera className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-pink-600 mb-4">Te rendiste! :0</h2>
                <p className="text-gray-700 mb-6 font-medium">
                    Como no pudiste resolverlo, tienes una <strong>PENITENCIA</strong> 😈:
                </p>
                <div className="bg-pink-50 p-4 rounded-lg mb-6 border-dashed border-2 border-pink-200">
                    <p className="text-lg text-pink-600 font-bold">
                        Tu dois m'envoyer 3 photos de toi quand tu étais bébé 👶📸
                    </p>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                    (Prometo no reírme... mucho 🤭)
                </p>

                <button
                    onClick={() => setAccepted(true)}
                    className="btn w-full shadow-lg"
                >
                    D'accord 🥺
                </button>
            </div>
        </div>
    );
};

export default PenaltyScreen;
