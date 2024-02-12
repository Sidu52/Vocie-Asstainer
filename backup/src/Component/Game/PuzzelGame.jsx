import React, { useState, useEffect } from 'react';
import {
    flower, flower1, flower2, flower3, flower4, flower5, flower6, flower7, flower8, flower9, flower10, flower11, flower12, flower13, flower14, flower15,
    girl, girl1, girl2, girl3, girl4, girl5, girl6, girl7, girl8, girl9, girl10, girl11, girl12, girl13, girl14, girl15,
    animal, animal1, animal2, animal3, animal4, animal5, animal6, animal7, animal8, animal9, animal10, animal11, animal12, animal13, animal14, animal15,
} from '../Game/Images/puzeelImages'


const flowerPuzzle = {
    original: flower,
    pieces: [
        flower1, flower2, flower3, flower4, flower5,
        flower6, flower7, flower8, flower9, flower10,
        flower11, flower12, flower13, flower14, flower15
    ]
}

const GirlPuzzle = {
    original: girl,
    pieces: [
        girl1, girl2, girl3, girl4, girl5, girl6, girl7, girl8, girl9, girl10, girl11, girl12, girl13, girl14, girl15,
    ]
}
const AnimalPuzzle = {
    original: animal,
    pieces: [
        animal1, animal2, animal3, animal4, animal5, animal6, animal7, animal8, animal9, animal10, animal11, animal12, animal13, animal14, animal15,
    ]
}


const PuzzleGame = ({ size }) => {
    const [tiles, setTiles] = useState([]);
    const [imgSelect, setImageSelect] = useState(AnimalPuzzle)
    const [isGameWon, setIsGameWon] = useState(false);

    useEffect(() => {
        checkGameStatus();
    }, [tiles]);

    useEffect(() => {
        setTiles(generateTiles(size));
    }, [size, imgSelect]);


    const generateTiles = (size) => {
        const flatTiles = Array.from({ length: size * size }, (_, index) => index + 1);
        const shuffledTiles = shuffleArray(flatTiles);
        const gridTiles = [];

        for (let i = 0; i < size; i++) {
            gridTiles.push(shuffledTiles.slice(i * size, (i + 1) * size).map(tile => tile === size * size ? null : tile));
        }

        return gridTiles;
    };
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const checkGameStatus = () => {
        const flatTiles = tiles.flat();
        for (let i = 0; i < flatTiles.length - 1; i++) {
            if (flatTiles[i] !== i + 1) {
                setIsGameWon(false);
                return;
            }
        }
        setIsGameWon(true);
    };

    const handleTileClick = (row, col) => {
        if (!isGameWon) {
            const newTiles = [...tiles];
            const selectedTile = newTiles[row][col];
            const emptyTile = findEmptyTile(newTiles);

            if (!emptyTile || selectedTile === null) {
                // Clicked on the empty space or already empty tile, do nothing
                return;
            }

            if (isAdjacent(selectedTile, emptyTile)) {
                // Swap the selected tile with the empty tile
                newTiles[row][col] = null;
                newTiles[emptyTile.row][emptyTile.col] = selectedTile;
                setTiles(newTiles);
            }
        }
    };
    const findEmptyTile = (grid) => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === null) {
                    return { row: i, col: j };
                }
            }
        }
    };

    const isAdjacent = (tile, emptyTile) => {
        const { row: tileRow, col: tileCol } = findTilePosition(tile);
        const { row: emptyRow, col: emptyCol } = emptyTile;

        return (
            (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol) ||
            (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow)
        );
    };


    const findTilePosition = (tile) => {
        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j] === tile) {
                    return { row: i, col: j };
                }
            }
        }
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        switch (selectedValue) {
            case 'flower':
                setImageSelect(flowerPuzzle);
                break;
            case 'girl':
                setImageSelect(GirlPuzzle);
                break;
            case 'animal':
                setImageSelect(AnimalPuzzle);
                break;
            default:
                break;
        }
    };


    return (
        <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white'>
            <h1>{isGameWon ? 'You Win!' : 'Puzzle Game'}</h1>
            <form>
                <select onChange={handleSelectChange} defaultValue="animal">
                    <option value="flower">Flower</option>
                    <option value="girl">Girl</option>
                    <option value="animal">Animal</option>
                </select>
            </form>
            <img className='w-52 h-52 mb-2' src={imgSelect.original} alt="" />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 100px)`, gap: '2px' }}>
                {tiles &&
                    tiles.map((row, rowIndex) =>
                        row.map((tile, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    border: '1px solid #000',
                                    overflow: 'hidden', // Crop the image pieces
                                    cursor: 'pointer',
                                }}
                            >
                                {tile !== null && (
                                    <div className=' relative w-full h-full'>
                                        <img
                                            src={imgSelect.pieces[tile - 1]} // Adjust the index to match the tile number
                                            alt={`Piece ${tile}`}
                                            style={{ width: '100%', height: '100%', objectFit: "cover" }}
                                        />
                                        {/* <p className='absolute top-0 font-extrabold text-white bg-black bg-opacity-25 rounded-full p-2'>{tile}</p> */}
                                    </div>

                                )}
                            </div>
                        ))
                    )}
            </div>
        </div>

    );
};

export default PuzzleGame;
