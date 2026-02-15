import React, { useState, useEffect } from 'react';
import puzzleImage from '../assets/puzzle.jpg';

interface PuzzleGameProps {
    onWin: () => void;
}

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
// The default solved state: [0, 1, 2, 3, 4, 5, 6, 7, 8]
// We'll treat the last number (8) as the empty tile.

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onWin }) => {
    const [tiles, setTiles] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    // Initialize and shuffle
    useEffect(() => {
        shuffleTiles();
    }, []);

    const shuffleTiles = () => {
        // Start with solved state
        let newTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);

        // Shuffle (Fisher-Yates) ensuring solvability is tricky, 
        // easier to simulate random valid moves from solved state to ensure solvability.
        // Or just simple check: A 3x3 puzzle is solvable if the number of inversions is even.

        // Let's allow random shuffle then check solvability.
        do {
            for (let i = newTiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
            }
        } while (!isSolvable(newTiles) || isSolvedState(newTiles)); // ensure mixed and solvable

        setTiles(newTiles);
        setMoves(0);
        setIsSolved(false);
    };

    const isSolvable = (arr: number[]) => {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                // Skip the empty tile (assume 8 is empty) for inversion counting
                if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    };

    const isSolvedState = (arr: number[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== i) return false;
        }
        return true;
    };

    const handleTileClick = (index: number) => {
        if (isSolved) return;

        const emptyIndex = tiles.indexOf(8); // 8 is empty
        if (canMove(index, emptyIndex)) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            setMoves(moves + 1);

            if (isSolvedState(newTiles)) {
                setIsSolved(true);
                setTimeout(onWin, 1000); // Wait a bit before showing victory screen
            }
        }
    };

    const canMove = (index: number, emptyIndex: number) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
        const emptyCol = emptyIndex % GRID_SIZE;

        return (
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)
        );
    };

    // 300x300 placeholder image
    const imageUrl = puzzleImage;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Resuelve para ver mi regalo ❤️</h2>
            <div className="mb-4 text-pink-500">Movimientos: {moves}</div>

            <div
                className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg shadow-xl"
                style={{ width: '310px', height: '310px' }} // 300px + gaps/padding
            >
                {tiles.map((tileNumber, index) => {
                    // Calculate background position
                    // tileNumber 0 -> 0,0
                    // tileNumber 1 -> 0, 33%
                    // ... 
                    // We need percentage: x% y%
                    // col = tileNumber % 3, row = Math.floor(tileNumber/3)
                    // 3x3 grid means 0%, 50%, 100% positions? No.
                    // In CSS background-position for 3x3: 
                    // 0 = 0% 0%
                    // 1 = 50% 0%
                    // 2 = 100% 0%
                    // 3 = 0% 50%
                    // etc.
                    const x = (tileNumber % 3) * 50;
                    const y = Math.floor(tileNumber / 3) * 50;

                    if (tileNumber === 8) {
                        return <div key={index} className="bg-pink-100/50 rounded-sm"></div>;
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => handleTileClick(index)}
                            className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[0.98] rounded-sm"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: '300%', // 300% to cover the whole logical image area since each tile is 1/3
                                backgroundPosition: `${x}% ${y}%`,
                                width: '100px',
                                height: '100px',
                            }}
                        >
                            {/* Optional number for easy testing/hint */}
                            {/* <span className="text-xs text-white drop-shadow-md p-1">{tileNumber + 1}</span> */}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={shuffleTiles}
                className="mt-8 text-pink-400 underline text-sm hover:text-pink-600"
            >
                Reiniciar Puzzle
            </button>
        </div>
    );
};

export default PuzzleGame;
