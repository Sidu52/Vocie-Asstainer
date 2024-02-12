import React, { useState, useRef, useEffect, useContext } from "react";
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import { takeInput } from "../../Screen/MainVoiceFuntion";
import axios from 'axios';
import SnakeGame from "../Game/SnakeGame";
import PuzzleGame from "../Game/PuzzelGame";

export default function Game({ userInput }) {
    const [showwindow, setShowWindow] = useState(false)
    const [snakeGame, setSnakeGame] = useState(false);
    const [showGame, setShowGame] = useState();
    const [gkQuiz, setGkQuize] = useState({ question: "", options: [], correctAns: "" });
    const { setListen, setSpeaking, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            gameSelect();
        }
    }, []);

    async function gameSelect() {
        const lowerCasedInput = userInput.toLowerCase();

        if (lowerCasedInput.includes("gkquize") || lowerCasedInput.includes("gk quize") || lowerCasedInput.includes("question answer")) {
            await gkquize();
        } else if (lowerCasedInput.includes("number guessing") || lowerCasedInput.includes("number")) {
            await numberGussing();
        } else if (lowerCasedInput.includes("puzzle")) {
            setSpeaking(true);
            speakText("okay, We are in underprocess");
            setSpeaking(false);
            setShowGame(<PuzzleGame size={4} />)
            setTimeout(() => {
                setSnakeGame(true)
            }, 5000)
            return closeGame();
        } else if (lowerCasedInput.includes("snake")) {
            setSpeaking(true);
            speakText("We are in underprocess");
            setSpeaking(false);
            setShowGame(<SnakeGame width={500} height={500} />)
            setTimeout(() => {
                setSnakeGame(true)
            }, 5000)
            return closeGame();
        }
        else {
            setSpeaking(true);
            await speakText("I have two games for you: a general knowledge quiz or a number guessing game. Which one would you play otherwise i create a another game for you. for example snake or puzzle game ");
            setSpeaking(false);
            setMicListen(true)
            let input = await takeInput();
            setMicListen(false)
            const lowerCasedInput = input.toLowerCase();
            if (lowerCasedInput.includes("gkquize") || lowerCasedInput.includes("gk quize") || lowerCasedInput.includes("general knowledge") || lowerCasedInput.includes("question answer")) {
                await gkquize();
            } else if (lowerCasedInput.includes("number guessing") || lowerCasedInput.includes("number")) {
                await numberGussing();
            } else if (lowerCasedInput.includes("create") || lowerCasedInput.includes("game") || lowerCasedInput.includes("another")) {

                if (lowerCasedInput.includes("puzzle") || lowerCasedInput.includes("puzzlegame")) {
                    setSpeaking(true);
                    await speakText("okay i create a puzzle game");
                    speakText("We are in underprocess");
                    setSpeaking(false);
                    setShowGame(<PuzzleGame size={4} />)
                } else {
                    setSpeaking(true);
                    await speakText("okay i create a everyone childhood favourite game snakegame");
                    speakText("We are in underprocess");
                    setSpeaking(false);
                    setShowGame(<SnakeGame width={500} height={500} />)
                }

                setTimeout(() => {
                    setSnakeGame(true)
                }, 5000)
                closeGame();
            }
            else {
                setSpeaking(true);
                await speakText("Sorry, I didn't catch that. Let's try again later. Thanks for stopping by!");
                setSpeaking(false);
                return setListen(true);
            }
        }
    }

    const closeGame = async () => {
        setMicListen(true)
        let input = await takeInput();
        setMicListen(false)
        if (input.toLowerCase().includes("stop") || input.toLowerCase().includes("close")) {
            return setListen(true)
        } else {
            closeGame()
        }

    }


    async function gkquize() {
        try {
            setShowWindow(true);
            var score = 0;
            const { data } = await axios.get("https://the-trivia-api.com/v2/questions");

            for (let i = 0; i < data.length; i++) {
                const question = data[i].question;
                const correctAnswer = data[i].correctAnswer;
                const incorrectAnswers = data[i].incorrectAnswers;

                setSpeaking(true);
                await speakText("Question");
                setSpeaking(false);
                setGkQuize({ ...gkQuiz, question: question.text });
                await speakText(question.text);

                const options = ['A', 'B', 'C', 'D'];
                const answers = [...incorrectAnswers, correctAnswer];
                shuffleArray(answers);

                for (let j = 0; j < answers.length; j++) {
                    const optionText = `${options[j]}. ${answers[j]}`;
                    setSpeaking(true);
                    await speakText(optionText);
                    setSpeaking(false);
                    setGkQuize(prevState => ({
                        ...prevState,
                        options: [...prevState.options, optionText]
                    }));
                }

                setSpeaking(true);
                await speakText("Choose from options A, B, C, or D");
                setSpeaking(false);
                setMicListen(true)
                let answer = await takeInput();
                setMicListen(false)
                var k = 0;

                while (k != 3 && !answer.includes("A") && !answer.includes("B") && !answer.includes("C") && !answer.includes("D")) {
                    if (answer.includes("jarvis stop")) {
                        return;
                    }
                    setSpeaking(true);
                    await speakText("Please choose a valid option (A, B, C, or D)");
                    setSpeaking(false);
                    setMicListen(true)
                    answer = await takeInput();
                    setMicListen(false)
                    k++;
                }

                if (answer.includes("A")) {
                    answer = "A"
                }
                else if (answer.includes("B")) {
                    answer = "B"
                }
                else if (answer.includes("C")) {
                    answer = "C"
                }
                else if (answer.includes("D")) {
                    answer = "D"
                }
                const index = options.indexOf(answer);
                if (answers[index] === correctAnswer) {
                    setGkQuize({ ...gkQuiz, correctAns: correctAnswer })
                    setSpeaking(true);
                    await speakText("Your answer is correct");
                    setSpeaking(false);
                    score++;
                } else {
                    setGkQuize({ ...gkQuiz, correctAns: correctAnswer })
                    setSpeaking(true);
                    await speakText("Your answer is incorrect");
                    setSpeaking(false);
                }
                setSpeaking(true);
                await speakText("Correct option is" + correctAnswer);
                setSpeaking(false);

                if (i < data.length - 1) {
                    setSpeaking(true);
                    await speakText("Next Question");
                    setSpeaking(false);
                }
            }
            setSpeaking(true);
            await speakText(`Your Score is ${score}`);
            setSpeaking(false);
            return setListen(true);
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
            setSpeaking(true);
            await speakText("Oops! Something went wrong while fetching quiz questions. Please try again later.");
            setSpeaking(false);
            return setListen(true);
        }
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function numberGussing() {
        const secretNumber = Math.floor(Math.random() * 10) + 1;
        let attempts = 0;

        setSpeaking(true);
        await speakText("Welcome to the Number Guessing Game! Try to guess the secret number between 1 and 10. You have only 3 attempts.");
        setSpeaking(false);
        setMicListen(true)
        let answer = await takeInput();
        setMicListen(false)

        while (attempts !== 2 && answer.match(/\d+/g) !== secretNumber) {
            if (answer.includes("jarvis stop")) {
                return;
            } else if (answer.match(/\d+/g) < secretNumber) {
                setSpeaking(true);
                await speakText("Too low!");
                setSpeaking(false);
            } else if (answer.match(/\d+/g) > secretNumber) {
                setSpeaking(true);
                await speakText("Too high!");
                setSpeaking(false);
            } else {
                setSpeaking(true);
                await speakText("Please enter a valid number.");
                setSpeaking(false);
            }
            setSpeaking(true);
            await speakText("Please choose a number.");
            setSpeaking(false);
            setMicListen(true)
            answer = await takeInput();
            setMicListen(false)
            attempts++;
        }

        if (parseInt(answer) === secretNumber) {
            setSpeaking(true);
            await speakText("Congratulations! You guessed the correct number!");
            setSpeaking(false);
        } else {
            setSpeaking(true);
            await speakText(`Sorry, you're out of attempts. The correct number was ${secretNumber}.`);
            setSpeaking(false);
        }

        return setListen(true);
    }

    return (
        <>
            {snakeGame ? showGame : null}

            {gkQuiz && showwindow ? (
                <div className="bg-gray-200 p-4 m-4 rounded">
                    <h3 className="text-lg font-bold mb-2">Que. {gkQuiz.question}</h3>
                    <ul className="list-none">
                        {gkQuiz.options.map((option, index) => (
                            <li key={index} className="list-disc ml-4">{option}</li>
                        ))}
                    </ul>
                    <p className="text-base bg-green-400 bg-opacity-15 px-2 py-4">{gkQuiz.correctAns}</p>
                </div>
            ) : null}
        </>
    );

}
