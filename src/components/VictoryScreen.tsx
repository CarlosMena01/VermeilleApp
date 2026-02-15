import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface VictoryScreenProps {
    onContinue: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onContinue }) => {
    useEffect(() => {
        // Fire confetti immediately
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff1493', '#ffb7c5']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff1493', '#ffb7c5']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-8 text-center animate-in fade-in zoom-in duration-500">
            <Heart className="w-24 h-24 text-red-500 animate-bounce mb-6 drop-shadow-lg" fill="currentColor" />
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Lo lograste! 🎉</h2>
            <p className="text-lg text-gray-700 mb-8 font-medium">
                No solo eres bonita, también eres inteligente, je t'aime!!
            </p>
            <p className="text-lg text-gray-700 mb-8 font-medium">
                Aquí tienes mi regalito {"<3"}
            </p>
            <button onClick={onContinue} className="btn shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1">
                Leer mis cartas 💌
            </button>
        </div>
    );
};

export default VictoryScreen;
