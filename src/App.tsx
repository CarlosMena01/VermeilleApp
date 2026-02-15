import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import IntroScreen from './components/IntroScreen';
import PuzzleGame from './components/PuzzleGame';
import VictoryScreen from './components/VictoryScreen';
import PenaltyScreen from './components/PenaltyScreen';
import MessageGallery from './components/MessageGallery';
import FinalScreen from './components/FinalScreen';

type Screen = 'welcome' | 'intro' | 'puzzle' | 'victory' | 'penalty' | 'gallery' | 'final';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleStart = () => setCurrentScreen('intro');
  const handleIntroNext = () => setCurrentScreen('puzzle');

  const handlePuzzleWin = (skipped: boolean = false) => {
    if (skipped) {
      setCurrentScreen('penalty');
    } else {
      setCurrentScreen('victory');
    }
  };

  const handleVictoryContinue = () => setCurrentScreen('gallery');
  const handlePenaltyContinue = () => setCurrentScreen('gallery');

  const handleGalleryFinish = () => setCurrentScreen('final');
  const handleRestart = () => setCurrentScreen('welcome');

  return (
    <div className="font-sans antialiased text-gray-800">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'intro' && <IntroScreen onNext={handleIntroNext} />}
      {currentScreen === 'puzzle' && <PuzzleGame onWin={handlePuzzleWin} />}
      {currentScreen === 'victory' && <VictoryScreen onContinue={handleVictoryContinue} />}
      {currentScreen === 'penalty' && <PenaltyScreen onContinue={handlePenaltyContinue} />}
      {currentScreen === 'gallery' && <MessageGallery onFinish={handleGalleryFinish} />}
      {currentScreen === 'final' && <FinalScreen onRestart={handleRestart} />}
    </div>
  );
}

export default App;
