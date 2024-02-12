import React, { useState, useEffect, useRef } from 'react';

const ROWS = 50;
const COLS = 50;

const INITIAL_SPEED = 200;

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

const SnakeGame = ({ width, height }) => {
    const [snake, setSnake] = useState([{ row: 0, col: 0 }]);
    const [food, setFood] = useState();
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameLoopInterval = useRef(null);

    const generateRandomCell = () => {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);

        return { row, col };
    };

    useEffect(() => {
        setFood(generateRandomCell());
    }, []);

    const resetGame = () => {
        setSnake([{ row: 0, col: 0 }]);
        setFood(generateRandomCell());
        setDirection(Direction.RIGHT);
        setSpeed(INITIAL_SPEED);
        setGameOver(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === ' ' && gameOver) {
            resetGame();
            document.addEventListener('keydown', handleKeyPress); // Add the event listener again after restarting
        } else if (event.key === ' ' && !gameOver) {
            // Handle pausing the game or other actions when the spacebar is pressed during the game
        } else {
            switch (event.key) {
                case 'ArrowUp':
                    setDirection(Direction.UP);
                    break;
                case 'ArrowDown':
                    setDirection(Direction.DOWN);
                    break;
                case 'ArrowLeft':
                    setDirection(Direction.LEFT);
                    break;
                case 'ArrowRight':
                    setDirection(Direction.RIGHT);
                    break;
                default:
                    break;
            }
        }
    };

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
            case Direction.UP:
                head.row = (head.row - 1 + ROWS) % ROWS;
                break;
            case Direction.DOWN:
                head.row = (head.row + 1) % ROWS;
                break;
            case Direction.LEFT:
                head.col = (head.col - 1 + COLS) % COLS;
                break;
            case Direction.RIGHT:
                head.col = (head.col + 1) % COLS;
                break;
            default:
                break;
        }

        newSnake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
            setFood(generateRandomCell());
            setSpeed(speed - 10);
            setScore(score + 1)
        } else {
            newSnake.pop();

        }
        if (checkCollision(newSnake)) {
            setGameOver(true);

        } else {
            setSnake(newSnake);

        }
    };

    const checkCollision = (snake) => {
        const head = snake[0];
        return snake.slice(1).some((segment) => segment.row === head.row && segment.col === head.col);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameOver]);

    useEffect(() => {
        if (!gameOver) {
            document.addEventListener('keydown', handleKeyPress);

            gameLoopInterval.current = setInterval(() => {
                moveSnake();
            }, speed);

            return () => {
                document.removeEventListener('keydown', handleKeyPress);
                clearInterval(gameLoopInterval.current);
            };
        } else {
            clearInterval(gameLoopInterval.current);
        }
    }, [snake, direction, food, speed]);

    const cellWidth = width / COLS;
    const cellHeight = height / ROWS;

    return (
        <div className='bg-black absolute z-10 rounded-lg'>
            <h1 className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white'>
                {gameOver ? 'Game Over!' : ''}
                {gameOver ?
                    <span>
                        <p>Your Score: {score}</p>
                    </span> : ''}
            </h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${COLS}, ${cellWidth}px)`,
                    gridTemplateRows: `repeat(${ROWS}, ${cellHeight}px)`,
                    width: '100%',
                    height: '100%',
                }}
            >
                {Array.from({ length: ROWS * COLS }).map((_, index) => {
                    const row = Math.floor(index / COLS);
                    const col = index % COLS;

                    const isSnakeCell = snake.some((cell) => cell.row === row && cell.col === col);
                    const isFoodCell = food && food.row === row && food.col === col;

                    return (
                        <div
                            key={index}
                            style={{
                                width: cellWidth,
                                height: cellHeight,
                                backgroundColor: isSnakeCell ? '#e9cf11ed' : isFoodCell ? 'red' : 'black',
                                borderRadius: '30px',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SnakeGame;
