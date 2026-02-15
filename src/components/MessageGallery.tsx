import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import antiguaImage from '../assets/antigua.jpg';
import paredonImage from '../assets/paredon.jpg';
import mexicoImage from '../assets/mexico.jpg';
import distanciaImage from '../assets/distancia.jpg';

interface MessageGalleryProps {
    onFinish: () => void;
}

const messages = [
    {
        title: "Antigua Guatemala",
        body: "Fue hermoso cuando nos conocimos en Las Palmas, bailar contigo salsa fue algo hermoso, siempre recordaré con mucha felicidad cuando solo bailamos tú y yo, no había nadie más en la pista. Me encantó nuestra conexión desde el primer momento.",
        image: antiguaImage // Placeholder: Reemplazar con foto de Antigua
    },
    {
        title: "Paredón",
        body: "Sin duda nuestro pequeño nido de amor, el lugar donde nos acercamos mucho más, muy triste que no pudieses surfear junto a mi (snif) pero siempre recordaré estar tú y yo, solos, viendo las estrellas en la playa mientras hablabamos de sueños e historias <3",
        image: paredonImage // Placeholder: Reemplazar con foto de Paredón
    },
    {
        title: "México",
        body: "Fue un viaje loco jajaja, y un poco irresponsable financieramente, pero valió totalmente la pena, nos acercamos de manera real, con conversaciones dificiles (aunque durmiera un poco) pero nos mostró lo fuerte que es nuestro amor, soy feliz de haber visto otra puesta de sol a tu lado :3",
        image: mexicoImage // Placeholder: Reemplazar con foto de México
    },
    {
        title: "La distancia",
        body: "Sé que este es el capítulo más dificil, ninguno de los dos está preparado para una relación a distancia, pero no dudo ni un segundo que lo superaremos juntos, te amo mucho y extraño cada día mi muchachita. Y será muy hermoso cuando nos volvamos a ver y pueda darte besitos al despertar <3",
        image: distanciaImage // Placeholder: Reemplazar con foto actual/distancia
    }
];

const MessageGallery: React.FC<MessageGalleryProps> = ({ onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const nextMessage = () => {
        if (!showImage) {
            setShowImage(true);
        } else {
            // We are on an image, moving to the next card
            setIsFading(true);

            setTimeout(() => {
                setShowImage(false);
                if (currentIndex < messages.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    onFinish();
                }
                // Short delay to allow state to update before fading back in
                setTimeout(() => setIsFading(false), 50);
            }, 300); // Wait for fade out
        }
    };

    const prevMessage = () => {
        if (showImage) {
            setShowImage(false);
        } else {
            if (currentIndex > 0) {
                setIsFading(true);
                setTimeout(() => {
                    setCurrentIndex(currentIndex - 1);
                    setShowImage(true); // Should we go back to image or text? Usually text is safer but logic says image. 
                    // Let's go to text for consistency? Or stick to previous logic (showImage: true). 
                    // Previous logic: setCurrentIndex(prev); setShowImage(true);
                    // Let's keep it but fade.
                    setTimeout(() => setIsFading(false), 50);
                }, 300);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-6">
            <h2 className="text-xl font-bold text-pink-400 mb-8 uppercase tracking-widest">Nuestra historia</h2>

            <div className={`relative w-full max-w-sm aspect-[4/5] perspective-1000 transition-all duration-500 ease-in-out ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div
                    className={`relative w-full h-full transform-style-3d ${!isFading ? 'transition-transform duration-700' : ''} ${showImage ? 'rotate-y-180' : ''}`}
                >
                    {/* Front Face (Text) */}
                    <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center backface-hidden">
                        <Heart className="w-12 h-12 text-pink-200 mb-4 absolute top-6" fill="currentColor" />
                        <div className="animation-fade-in-slide-up">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{messages[currentIndex].title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed italic text-center justify-center text-justify">
                                "{messages[currentIndex].body}"
                            </p>
                        </div>
                        <div className="absolute bottom-6 flex gap-2">
                            {messages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-pink-500 w-6' : 'bg-pink-200'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Back Face (Image) */}
                    <div className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden backface-hidden rotate-y-180 flex items-center justify-center bg-transparent">
                        <img
                            src={messages[currentIndex].image}
                            alt={messages[currentIndex].title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full max-w-sm mt-8 px-4">
                <button
                    onClick={prevMessage}
                    disabled={currentIndex === 0 && !showImage}
                    className={`p-3 rounded-full ${currentIndex === 0 && !showImage ? 'text-gray-300' : 'text-pink-500 bg-white shadow-md hover:bg-pink-50'}`}
                >
                    <ChevronLeft />
                </button>

                <button
                    onClick={nextMessage}
                    className="btn flex items-center gap-2 px-6 py-3"
                >
                    {currentIndex === messages.length - 1 && showImage ? 'Sorpresa Final ✨' : (showImage ? 'Siguiente Carta' : 'Ver Recuerdo')}
                    {!(currentIndex === messages.length - 1 && showImage) && <ChevronRight size={20} />}
                </button>
            </div>
        </div>
    );
};

export default MessageGallery;
